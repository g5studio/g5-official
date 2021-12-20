import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Level, NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AppTranslateModule } from './translate/app.translate.module';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';

let LOG_LEVEL = Level.LOG;
if (environment.production) {
  LOG_LEVEL = Level.ERROR;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppTranslateModule,
    NgbModule,
    LayoutModule,
    SharedModule,
    NgLoggerModule.forRoot(LOG_LEVEL),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
