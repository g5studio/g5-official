import { HttpEventType } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '@shared/overlay/modal/modal.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { AbstractNgModel, getNgModelProvider } from '@utilities/abstract/abstract-ng-model';
import { EModalType, ESize } from '@utilities/enums/common.enum';
import { IModal } from '@utilities/interfaces/overlay.interface';
import { Observable } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

/**
 * @property file 檔案物件
 * @property thumbnail 檔案縮圖
 * @property uploaded 是否完成上傳
 * @property failed 是否上傳成功
 * @property result 上傳成功後Api返回結果
 */
interface ISeletcedFile {
  file?: File,
  thumbnail?: string,
  progress?: number,
  uploaded?: boolean,
  failed?: boolean,
  result?: any
}
@Component({
  selector: 'app-multiple-upload-button',
  templateUrl: './multiple-upload-button.component.html',
  styleUrls: ['./multiple-upload-button.component.scss'],
  providers: [getNgModelProvider(MultipleUploadButtonComponent)]
})
export class MultipleUploadButtonComponent extends AbstractNgModel<File[]> {

  @Input() size: ESize = ESize.Middle;
  @Input() allowTypes: string[] = [];
  @Input() name: string;
  /**
   * @description 外部指定觸發上傳事件
   */
  @Input() uploadFun: (file: File) => Promise<Observable<any>>;
  @Output() afterUploaded = new EventEmitter();
  @Output() removeUploadedFile = new EventEmitter();

  constructor(
    private $overlay: OverlayService
  ) {
    super();
  }

  /**
   * @description 已選取檔案，綁定至外部元件
   */
  public files: File[] = [];
  public fileMap = new Map<string, ISeletcedFile>([]);
  private uploadQueue = new Set<string>();

  get id() { return this.name ? `multiple-upload-btn-${this.name}` : 'multiple-upload-btn'; }
  get empty() { return this.files.length <= 0; }
  get isUploading() { return this.uploadQueue.size > 0; }
  public trackByFn(index, item) { return index; }

  /**
   * @description 不支援預設值，但可從外部清空已選取檔案
   */
  protected onModelChanged({ value }) {
    if (!value) {
      this.files = [];
      this.fileMap.clear();
      this.uploadQueue.clear();
    }
  }

  public selectFile(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach((file: File) => {
        if (this.validateFile(file.name)) {
          /.pdf/.test(file.name) ? this.afterFileSelected(file, 'assets/images/icons/pdf-thumbnail.svg') :
            /.xlsx/.test(file.name) ? this.afterFileSelected(file, 'assets/images/icons/excel-thumbnail.svg') :
              /image/.test(file.type) && !/.svg/.test(file.name) ?
                this.convertBase64(file).then(thumbnail => this.afterFileSelected(file, thumbnail)) :
                this.afterFileSelected(file, 'assets/images/icons/unknown-thumbnail.svg');
        }
      });
      this.notifyValueChange(this.files);
    }
  }

  /**
   * @description 僅上傳尚未上傳或失敗的檔案
   */
  public upload() {
    Array.from(this.fileMap.values())
      .filter(({ uploaded, failed }) => !uploaded || failed)
      .map(({ file }) => file)
      .forEach((file) => {
        this.uploadQueue.add(file.name);
        this.updateFileMap(file.name, { progress: 0 })
        this.uploadFun(file).then(mutation => {
          mutation.pipe(
            takeUntil(this.onDestroy$),
            finalize(() => this.uploadQueue.delete(file.name))
          ).subscribe(
            res => {
              switch (res.type) {
                case HttpEventType.UploadProgress:
                  this.updateFileMap(file.name, { progress: Math.round((res.loaded * 100) / res.total) })
                  break;
                case HttpEventType.Response:
                  this.updateFileMap(file.name, { result: res.body });
                  this.afterUploaded.emit(res.body);
                  break;
              }
            },
            () => {
              this.$overlay.toggleDialog<IModal>(ModalComponent, {
                config: {
                  type: EModalType.Alert,
                  title: file.name,
                  content: 'Alert.Validation.UploadFailed',
                  confirm: 'Button.Confirm'
                }
              });
              this.updateFileMap(file.name, { progress: 100, failed: true, uploaded: true })
            },
            () => this.updateFileMap(file.name, { progress: 100, uploaded: true, failed: false })
          );
        });
      });
  }

  public drop(event: DragEvent) {
    event.preventDefault();
    this.selectFile(event.dataTransfer.files);
  }

  /**
   * @description 移除已選擇檔案
   * @param reslut 若該檔案已上傳成功，額外發出通知
   */
  public remove(target: File, reslut: any, event: MouseEvent) {
    event.stopPropagation();
    if (event.button === 0) {
      this.files = this.files.filter(({ name }) => name !== target.name);
      this.fileMap.delete(target.name);
      this.notifyValueChange(this.files);
      if (reslut) {
        this.removeUploadedFile.emit(reslut);
      }
    }
  }

  private updateFileMap(name: string, value: ISeletcedFile) {
    const Config = this.fileMap.get(name);
    this.fileMap.set(name, { ...Config, ...value });
  }

  private convertBase64(file: File): Promise<any> {
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    return new Promise<any>(resolve => Reader.onload = () => resolve(Reader.result));
  }

  private afterFileSelected(file: File, thumbnail: string) {
    this.files.push(file);
    this.fileMap.set(file.name, { file, thumbnail, progress: null });
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
      return false
    }

    if (this.files.some(file => file.name === name)) {
      this.$overlay.toggleDialog<IModal>(ModalComponent, {
        config: {
          type: EModalType.Notification,
          title: name,
          content: 'Alert.Validation.FileExist',
          confirm: 'Button.Confirm'
        }
      });
      return false
    }
    return true;
  }


}
