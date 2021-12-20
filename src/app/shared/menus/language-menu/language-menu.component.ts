import { PopupBox } from '@utilities/abstract/popup-box';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent extends PopupBox implements OnInit {

  @Input() white;
  @Input() small;

  constructor(
    public $translate: TranslateService,
    private $language: LanguageService
  ) {
    super();
  }

  get isWhite() { return this.white !== undefined && this.white !== false; }
  get isSmall() { return this.small !== undefined && this.small !== false; }

  ngOnInit(): void {
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
