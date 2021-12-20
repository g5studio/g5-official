import { Directive, ElementRef, OnChanges, SimpleChanges, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  // will detect value change, if current more than previous, will mark text green if not will mark red

  @Input() appHighlight;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const Previous = changes.appHighlight.previousValue;
    const Current = changes.appHighlight.currentValue;
    if (Current !== Previous) {
      this.renderer.setStyle(this.element.nativeElement, 'color', Current > Previous ? '#008000' : '#D80238');
      this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
    } else {
      this.renderer.removeStyle(this.element.nativeElement, 'color');
    }
  }

}
