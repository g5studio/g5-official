import { DirectivesModule } from './directives/directives.module';
import { OverlayModule } from './overlay/overlay.module';
import { PipesModule } from '@utilities/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FieldModule } from './field/field.module';
import { MenusModule } from './menus/menus.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ButtonsModule } from './buttons/buttons.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    PipesModule,
    NgbModule,
    FieldModule,
    OverlayModule,
    DirectivesModule,
    MenusModule,
    CKEditorModule
  ],
  exports: [
    FormsModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbModule,
    FieldModule,
    ButtonsModule,
    OverlayModule,
    DirectivesModule,
    MenusModule,
    CKEditorModule
  ]
})
export class SharedModule { }
