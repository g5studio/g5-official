import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  ViewContainerRef,
  Input,
  TemplateRef,
  ContentChild
} from '@angular/core';

/**
 * @link https://devops.tcghl.com/DefaultCollection/TCG/_workitems/edit/26286/
 */

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input() position: 'top' | 'left' | 'right' | 'bottom' = 'bottom';
  @Input() appTooltip: string;
  @ContentChild('tooltipTemplate') tooltipTemplateRef: TemplateRef<any>;

  constructor(
    private renderer: Renderer2,
    private e: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {
    e.nativeElement.style.position = 'relative';
  }

  private tooltip: Element = null;

  @HostListener('mouseenter') onMouseIn() {
    this.tooltipTemplateRef ? this.embedView() : this.appendToolTip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltip ? this.renderer.removeChild(this.e.nativeElement, this.tooltip) : this.viewContainerRef.clear();
    this.tooltip = null;
  }


  private appendToolTip() {
    this.tooltip = this.renderer.createElement('label');
    this.tooltip.innerHTML = this.appTooltip;
    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    this.renderer.setStyle(this.tooltip, 'z-index', '2');
    this.renderer.setStyle(
      this.tooltip, `${this.position === 'right' ? 'right' : 'left'}`,
      `${this.position === 'top' || this.position === 'bottom' ? '50%' : 0}`
    );
    this.renderer.setStyle(
      this.tooltip, `${this.position === 'bottom' ? 'bottom' : 'top'}`,
      `${this.position === 'left' || this.position === 'right' ? '50%' : 0}`
    );
    this.renderer.setStyle(
      this.tooltip, `transform`,
      `${this.position === 'top' ? 'translate(-50%, calc(-100% - 0.5rem))' :
        this.position === 'bottom' ? 'translate(-50%, calc(100% + 0.5rem))' :
          this.position === 'left' ? 'translate(calc(-100% - 0.5rem), -50%)' : 'translate(calc(100% + 0.5rem), -50%)'}`
    );
    this.renderer.setStyle(this.tooltip, 'background-color', '#212B36');
    this.renderer.setStyle(this.tooltip, 'color', 'white');
    this.renderer.setStyle(this.tooltip, 'font-size', '0.75rem');
    this.renderer.setStyle(this.tooltip, 'font-family', '"SF Pro Text", Arial, "Microsoft YaHei", "微软雅黑", "PingFangSC-Regular"');
    this.renderer.setStyle(this.tooltip, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltip, 'line-height', '1.5rem');
    this.renderer.setStyle(this.tooltip, 'margin', '0');
    this.renderer.setStyle(this.tooltip, 'padding', '0 0.5rem');
    this.renderer.setStyle(this.tooltip, 'border-radius', '3px');
    this.renderer.appendChild(this.e.nativeElement, this.tooltip);
  }

  private embedView() {
    const View = this.viewContainerRef.createEmbeddedView(this.tooltipTemplateRef);
    View.rootNodes.forEach(node =>
      this.renderer.appendChild(this.e.nativeElement, node));
  }

}
