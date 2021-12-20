import { Injectable } from '@angular/core';
import { DialogComponent } from '@shared/overlay/dialog/dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { ESize } from '@utilities/enums/common.enum';
import { UnsubOndestroy } from './unsub-ondestroy';

@Injectable()
export abstract class AbstractDialog<T> extends UnsubOndestroy {
  constructor(
    protected $overlay: OverlayService,
    protected dialog: DialogComponent<T>
  ) {
    super();
  }

  get id() { return this.dialog.id; }
  get callbacks() { return this.dialog.params.callbacks; }
  get config() { return this.dialog.params.config; }
  get options() { return this.dialog.params.options; }
  get size(): typeof ESize { return ESize; }

  public cancel(parms?: any) {
    if (this.dialog.params.callbacks?.cancel) {
      this.dialog.params.callbacks?.cancel(parms);
    }
    this.$overlay.closeDialog(this.dialog);
  }

  public confirm(parms?: any) {
    if (this.dialog.params.callbacks?.confirm) {
      this.dialog.params.callbacks?.confirm(parms);
    }
    this.$overlay.closeDialog(this.dialog);
  }

  public close() {
    this.$overlay.closeDialog(this.dialog);
  }
}
