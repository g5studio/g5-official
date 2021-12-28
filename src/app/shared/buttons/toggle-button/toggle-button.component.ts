import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Input() enable: string;
  @Input() disable: string;
  @Output() OnToggle: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public switch = false;

  ngOnInit(): void {
  }

  public toggle() {
    this.switch = !this.switch;
    this.OnToggle.emit(this.switch);
  }

}
