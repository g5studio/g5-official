import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LanguageMenuComponent
  ],
  exports: [
    LanguageMenuComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class MenusModule { }
