import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '@shared/services/language.service';
import { NavigationService } from '@shared/services/navigation.service';
import { WindowHelperService } from '@utilities/helper/window-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public $navigation: NavigationService,
    private $language: LanguageService,
    private $window: WindowHelperService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.$language.initial();
    this.$language.onLangChange.subscribe(e => {
      this.document.documentElement.lang = e.lang;
      this.isLanguageReady = true;
    });
  }

  public isLanguageReady = false;

  @HostListener('window:resize', ['$event']) onResize = () => this.$window.detectWindowSize();
}
