import { EmptySymbolPipe } from './empty-symbol.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';
import { MathAbsPipe } from './MathAbs.pipe';
import { SanitizePipe } from './sanitize.pipe';
import { ToNumberPipe } from './to-number.pipe';
import { AllTranslatePipe } from './all-translate.pipe';



@NgModule({
  declarations: [
    CustomDatePipe,
    MathAbsPipe,
    SanitizePipe,
    ToNumberPipe,
    EmptySymbolPipe,
    AllTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatePipe,
    MathAbsPipe,
    SanitizePipe,
    ToNumberPipe,
    EmptySymbolPipe,
    AllTranslatePipe
  ]
})
export class PipesModule { }
