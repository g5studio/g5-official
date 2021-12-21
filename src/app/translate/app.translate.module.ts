import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppMissingTranslationHandler } from './app-missing.translation.handler';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppTranslateModule { }
