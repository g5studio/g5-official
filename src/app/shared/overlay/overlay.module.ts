import { DirectivesModule } from './../directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { DialogComponent } from './dialog/dialog.component';
import { OverlayComponent } from './overlay.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    ModalComponent,
    PopupMessageComponent,
    DialogComponent,
    OverlayComponent,
    LoadingComponent
  ],
  exports: [
    ModalComponent,
    DialogComponent,
    PopupMessageComponent,
    OverlayComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    DirectivesModule
  ]
})
export class OverlayModule { }
