import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';
import { IDialog } from '@utilities/interfaces/overlay.interface';
// 控制啟用的彈窗
@Directive({
  selector: '[appActivatedDialog]'
})
export class ActivatedDialogDirective {

  @Input() appActivatedDialog: IDialog<any>;

  constructor(
    private element: ElementRef,
    private $overlay: OverlayService
  ) { }

  /**
   * @description 背景關閉
   */
  @HostListener('click', ['$event.target']) onClick(target: HTMLElement) {
    if (!this.element.nativeElement.children[0].contains(target) && this.appActivatedDialog.params.options?.backdropClose && target === this.element.nativeElement) {
      this.$overlay.closeDialog(this.appActivatedDialog);
    }
  }

}
