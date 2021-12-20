import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Injector } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { IDialog } from '@utilities/interfaces/overlay.interface';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent extends UnsubOndestroy implements OnInit {

  constructor(
    public $overlay: OverlayService
  ) {
    super();
  }

  public dialogs: { entity: IDialog<any>, injector: Injector }[] = [];

  ngOnInit() {
    this.$overlay.dialogQueue$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(dialogs => this.afterDialogsChanged(dialogs)
    );
  }

  /**
   * @description 觸發彈窗背景點擊事件
   */
  public onDialogBackdropClick(dialog: IDialog<any>, event: MouseEvent, backdrop: HTMLElement) {
    if (dialog.params.callbacks.backdrop && (event.target as HTMLElement === backdrop)) {
      dialog.params.callbacks.backdrop(dialog);
    }
  }

  /**
   * @description 更新彈窗
   */
  private afterDialogsChanged(dialogs: Set<IDialog<any>>) {
    this.dialogs = this.dialogs.map(dialog => dialogs.has(dialog.entity) ? dialog : null).filter(dialog => !!dialog);
    dialogs.forEach(
      dialog => {
        if (!this.dialogs.some(d => dialog === d.entity)) {
          this.dialogs.push({
            entity: dialog,
            injector: this.$overlay.getDialogInjector(dialog.id)
          });
        }
      }
    );
  }

}
