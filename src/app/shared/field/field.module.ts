import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentEditorComponent } from './document-editor/document-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    DocumentEditorComponent
  ],
  exports: [
    DocumentEditorComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    CommonModule,
    CKEditorModule
  ]
})
export class FieldModule { }
