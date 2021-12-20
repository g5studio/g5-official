import { AbstractNgModel, getNgModelProvider } from '@utilities/abstract/abstract-ng-model';
import { Component, Input } from '@angular/core';
import * as Editor from './editor/build/ckEditor';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  providers: [getNgModelProvider(DocumentEditorComponent)]
})
export class DocumentEditorComponent extends AbstractNgModel<string> {

  constructor() {
    super();
  }

  get document(): string {
    if (this.model === null || this.model === undefined) {
      this.model = '<h1>頁面標題</h1><h2>次標題</h2><h3>欄位標題</h3><p>內文</p>';
    }
    return this.model;
  }
  set document(value: string) {
    this.model = value;
    // this.notifyValueChange();
  }

  public editor = Editor;
  public customConfig = {
    toolbar: {
      items: [
        'paragraph', 'heading1', 'heading2', 'heading3',
        'bold',
        'italic',
        'fontSize',
        'fontColor',
        'fontFamily',
        'highlight',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        'alignment',
        'imageUpload',
        'link',
        'insertTable',
        'undo',
        'redo'
      ]
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    }
  };

  public onBlur() {
    this.notifyValueChange(this.formatDom(this.model));
  }

  /**
   * @description 附加style
   */
  private formatDom(origin: string): string {
    origin = origin.replace(/<h1>/g, '<h1 style="font-size: 24px; line-height: 24px; color: #212b36; margin: 0px; padding: 0px">');
    origin = origin.replace(/<h2>/g, '<h2 style="font-size: 18px; line-height: 24px; color: #212b36; margin: 0px; padding: 0px">');
    origin = origin.replace(/<h3>/g, '<h3 style="font-size: 14px; line-height: 20px; color: #212b36; margin: 0px; padding: 0px">');
    origin = origin.replace(/<img/g, '<img style="max-width: 100%"');
    origin = origin.replace(/<mark class="marker-green">/g, '<mark style="background-color: #62f962; color: inherit">');
    origin = origin.replace(/<mark class="marker-yellow">/g, '<mark style="background-color: #fdfd77; color: inherit">');
    origin = origin.replace(/<mark class="marker-pink">/g, '<mark style="background-color: #fc7899; color: inherit">');
    origin = origin.replace(/<mark class="marker-blue">/g, '<mark style="background-color: #72ccfd; color: inherit">');
    origin = origin.replace(/<mark class="marker-red">/g, '<mark style="background-color: #e71313; color: inherit">');
    origin = origin.replace(/<mark class="marker-green">/g, '<mark style="background-color: #128a00; color: inherit">');
    return origin;
  }




}
