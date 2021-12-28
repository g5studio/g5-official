import { AbstractNgModel, getNgModelProvider } from '@utilities/abstract/abstract-ng-model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
  providers: [getNgModelProvider(SwitchButtonComponent)]
})
export class SwitchButtonComponent extends AbstractNgModel<boolean> {

  @Input() name;

  constructor() {
    super();
  }

  get id() { return this.name ? `switch-btn-${this.name}` : 'switch-btn'; }
}
