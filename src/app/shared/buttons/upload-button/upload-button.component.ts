import { AbstractNgModel, getNgModelProvider } from '@utilities/abstract/abstract-ng-model';
import { Component, Input } from '@angular/core';
import { EModalType, ESize } from '@utilities/enums/common.enum';
import { OverlayService } from '@shared/overlay/overlay.service';
import { IModal } from '@utilities/interfaces/overlay.interface';
import { ModalComponent } from '@shared/overlay/modal/modal.component';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
  providers: [getNgModelProvider(UploadButtonComponent)]
})
export class UploadButtonComponent extends AbstractNgModel<File> {

  @Input() size: ESize = ESize.Middle;
  @Input() name: string;
  @Input() allowTypes: string[] = [];

  constructor(
    private $overlay: OverlayService
  ) {
    super();
  }

  public file: File;
  get id() { return this.name ? `upload-btn-${this.name}` : 'upload-btn'; }

  protected onModelChanged({ value }) {
    this.file = value;
  }

  public selectFile(event) {
    if (event.srcElement.files[0] && this.validateFile(event.srcElement.files[0].name)) {
      this.file = event.srcElement.files[0];
      this.notifyValueChange(this.file);
    }
  }

  private validateFile(name: string) {
    if (this.allowTypes.length > 0 && !this.allowTypes.some(type => new RegExp(`.${type}`).test(name))) {
      this.$overlay.toggleDialog<IModal>(ModalComponent, {
        config: {
          type: EModalType.Alert,
          title: name,
          content: 'Alert.Validation.FileType',
          confirm: 'Button.Confirm'
        }
      });
      return false;
    } else {
      return true;
    }
  }

}
