import { Component, OnInit, Input } from '@angular/core';
import { PopupMessageController } from '../overlay.model';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {


  @Input() central: boolean;
  @Input() controller: PopupMessageController;

  constructor() { }

  ngOnInit(): void {
  }

}
