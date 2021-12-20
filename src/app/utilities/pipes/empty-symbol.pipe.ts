import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptySymbol'
})
export class EmptySymbolPipe extends DecimalPipe implements PipeTransform {

  constructor() {
    super('en-US');
  }

  transform(value: any, args?: string): string {
    return typeof value === 'number' ? super.transform(value, args) : '-';
  }

}
