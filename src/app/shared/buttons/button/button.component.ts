import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ESize } from '@utilities/enums/common.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() OnClick: EventEmitter<void> = new EventEmitter();
  @Input() disabled;
  @Input() type: 'button' | 'submit' = 'button';

  constructor() { }

  public onClick(event: MouseEvent) {
    event.stopPropagation();
    this.OnClick.emit();
  }

}
