import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: any, decimal?: number): any {
    let formatNum;
    if (typeof value === 'string') {
      formatNum = value.replace(/,/g, '').trim();
    } else {
      formatNum = value;
    }
    return parseFloat(formatNum) || 0;
  }
}
