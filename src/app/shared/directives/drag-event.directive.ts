import { Directive, ElementRef, Renderer2, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { IOffset, IPosition } from '@utilities/interfaces/common.interface';

import { Subject, zip, Observable } from 'rxjs';
import {
  takeUntil,
  tap,
  map,
  withLatestFrom,
  filter
} from 'rxjs/operators';

@Directive({
  selector: '[appDragEvent]'
})
export class DragEventDirective extends UnsubOndestroy implements OnInit {
  @Input() touchOnly;
  @Output() dragStartChanged = new EventEmitter<IPosition<number>>();
  @Output() dragEndChanged = new EventEmitter<IPosition<number>>();
  @Output() dragMoving = new EventEmitter<IOffset<number>>();
  @Output() dragCompleted = new EventEmitter<IOffset<number>>();

  constructor(
    private e: ElementRef,
    private renderer: Renderer2
  ) {
    super();
  }

  get isTouchOnly() { return this.touchOnly !== undefined && this.touchOnly !== false; }

  private startPoint = new Subject<IPosition<number>>();
  private dragPoint = new Subject<IPosition<number>>();
  private endPoint = new Subject<IPosition<number>>();
  private dragEvent$: Observable<IOffset<number>> = zip(
    this.startPoint.asObservable().pipe(tap(point => this.dragStartChanged.emit(point))),
    this.endPoint.asObservable().pipe(tap(point => this.dragEndChanged.emit(point)))
  ).pipe(
    takeUntil(this.onDestroy$),
    map(([start, end]) => ({
      vertical: end.top - start.top,
      horizontal: end.left - start.left
    }))
  );

  private onDraging$: Observable<IOffset<number>> = this.dragPoint.asObservable().pipe(
    filter(({ top, left }) => !(top === 0 && left === 0)),
    withLatestFrom(this.startPoint.asObservable()),
    map(([latest, start]) => ({
      vertical: latest.top - start.top,
      horizontal: latest.left - start.top
    })),
    takeUntil(this.endPoint.asObservable())
  );

  @HostListener('dragstart', ['$event']) onDragStart({ screenX, screenY }: DragEvent) {
    if (!this.isTouchOnly) {
      this.onDraging$.subscribe(offset => this.dragMoving.emit(offset));
      this.startPoint.next({ top: screenY, left: screenX });
    }
  }

  @HostListener('drag', ['$event']) onDraging({ screenX, screenY }: DragEvent) {
    if (!this.isTouchOnly) {
      this.dragPoint.next({ top: screenY, left: screenX });
    }
  }

  @HostListener('dragend', ['$event']) onDragEnd({ screenX, screenY }: DragEvent) {
    if (!this.isTouchOnly) {
      this.endPoint.next({ top: screenY, left: screenX });
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart({ touches }: TouchEvent) {
    this.onDraging$.subscribe(offset => this.dragMoving.emit(offset));
    this.startPoint.next({
      top: touches[0].screenY,
      left: touches[0].screenX
    });
  }

  @HostListener('touchmove', ['$event']) onTouching({ touches }: TouchEvent) {
    this.dragPoint.next({
      top: touches[0].screenY,
      left: touches[0].screenX
    });
  }

  @HostListener('touchend', ['$event']) onTouchEnd({ changedTouches }: TouchEvent) {
    this.endPoint.next({
      top: changedTouches[0].screenY,
      left: changedTouches[0].screenX
    });
  }


  ngOnInit() {
    if (!this.isTouchOnly) {
      this.renderer.setAttribute(this.e.nativeElement, 'draggable', 'true');
    }
    this.dragEvent$.subscribe(offset => this.dragCompleted.emit(offset));
  }

}
