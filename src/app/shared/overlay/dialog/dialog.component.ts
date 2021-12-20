import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDialog, IOverlay } from '@utilities/interfaces/overlay.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent<T> implements IDialog<T> {
  @Output() close = new EventEmitter<void>();
  @Input() hideHeader;
  @Input() hideClose;

  constructor() { }
  /**
   * implement Dialog inteface
   * @param component dialog component entity
   * @param id dialog id
   * @param params params which injected into custom dialog
   */
  public component: any;
  public id: string;
  public params: IOverlay<T>;

}
