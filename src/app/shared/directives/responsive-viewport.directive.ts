import { ResizeObserver } from 'resize-observer';
import { tap, takeUntil } from 'rxjs/operators';
import { Directive, ElementRef, Renderer2, OnInit, Input, OnChanges, HostListener, Output, EventEmitter } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { EDevice } from '@utilities/enums/common.enum';
import { WindowHelperService } from '@utilities/helper/window-helper.service';

@Directive({
  selector: '[appResponsiveViewport]',
})

/**
 * @description
 * calculate viewport height dynamic
 */

export class ResponsiveViewportDirective extends UnsubOndestroy implements OnInit {
  @Input() responseBuffers: Element[] = [];
  @Input() breakpoints: EDevice[] = [];
  @Output() OnResize = new EventEmitter<any>();

  constructor(
    private e: ElementRef,
    private $window: WindowHelperService,
    private render: Renderer2
  ) {
    super();
  }

  private resize$: ResizeObserver;
  get bufferHeight() { return this.responseBuffers.reduce((total, current) => total = total + current.clientHeight, 0); }

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => {
    if (this.breakpoints.length === 0 || this.breakpoints.some(breakpoint => breakpoint === this.$window.getDevice())) {
      this.resizeViewport();
    }
  }

  ngOnInit() {
    this.resize$ = this.$window.resizeObserver(this.resizeViewport.bind(this));
    if (this.breakpoints.length === 0) {
      this.responseBuffers.forEach(element => this.resize$.observe(element));
    } else {
      this.$window.device$.pipe(
        takeUntil(this.onDestroy$),
        tap((device) => this.onDeviceChanged(device))
      ).subscribe();
    }
  }

  private onDeviceChanged(device: EDevice) {
    this.responseBuffers.forEach(element => this.resize$.unobserve(element));
    this.render.removeStyle(this.e.nativeElement, 'height');
    if (this.breakpoints.some(breakpoint => breakpoint === device)) {
      this.responseBuffers.forEach(element => this.resize$.observe(element));
    }
  }

  private resizeViewport() {
    this.render.setStyle(this.e.nativeElement, 'height', `${window.innerHeight - this.bufferHeight}px`);
    this.OnResize.emit(this.e.nativeElement.getBoundingClientRect());
  }

  public onDestroy() {
    this.resize$.disconnect();
    this.render.removeStyle(this.e.nativeElement, 'height');
  }
}
