import { AbstractDialog } from '@utilities/abstract/abstract-dialog';
import { Component } from '@angular/core';
import { IModal } from '@utilities/interfaces/overlay.interface';
import { OverlayService } from '../overlay.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ESize } from '@utilities/enums/common.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends AbstractDialog<IModal> {

  constructor(
    $overlay: OverlayService,
    dialog: DialogComponent<IModal>
  ) {
    super($overlay, dialog);
    setTimeout(() => this.dialog.params.size = ESize.Small, 0);
  }

}
