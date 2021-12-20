import { EventEmitter, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(
    private $translate: TranslateService,
  ) { }


  public initial() {
    this.seti18n(localStorage.getItem('language'));
  }

  public setLanguage(language: string) {
    localStorage.setItem('language', language);
    this.$translate.use(language);
  }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.$translate.onLangChange;
  }

  private seti18n(language?: string) {
    localStorage.setItem('language', language || this.getBrowserLanguage());
    this.$translate.addLangs(['en', 'zh-HK', 'zh-CN']);
    this.$translate.setDefaultLang('en');
    language ? this.$translate.use(language) : this.$translate.use(this.getBrowserLanguage());
  }

  private getBrowserLanguage() {
    const browserLang = this.$translate.getBrowserLang();
    return browserLang.match(/en/) ? 'en' :
      browserLang.match(/ja/) ? 'ja-JP' :
        browserLang.match(/zh/) ?
          navigator.language.endsWith('CN') ? 'zh-CN' : 'zh-HK'
          : browserLang;
  }
}
