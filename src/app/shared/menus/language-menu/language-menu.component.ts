import { PopupBox } from '@utilities/abstract/popup-box';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent extends PopupBox {

  constructor(
    public $translate: TranslateService,
    private $language: LanguageService
  ) {
    super();
  }


  public close(target: HTMLElement) {
    target.blur();
    this.collapse();
  }

  public setLanguage(language: string) {
    this.$language.setLanguage(language);
    this.collapse();
  }

}
