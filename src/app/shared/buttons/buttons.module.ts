import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { FormsModule } from '@angular/forms';
import { UploadButtonComponent } from './upload-button/upload-button.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { MultipleUploadButtonComponent } from './multiple-upload-button/multiple-upload-button.component';

@NgModule({
  declarations: [
    ButtonComponent,
    IconButtonComponent,
    ToggleButtonComponent,
    SwitchButtonComponent,
    UploadButtonComponent,
    RadioButtonComponent,
    MultipleUploadButtonComponent
  ],
  exports: [
    ButtonComponent,
    IconButtonComponent,
    ToggleButtonComponent,
    SwitchButtonComponent,
    UploadButtonComponent,
    RadioButtonComponent,
    MultipleUploadButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class ButtonsModule { }
