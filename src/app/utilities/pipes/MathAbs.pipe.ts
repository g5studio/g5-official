import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'mathAbs' })

export class MathAbsPipe implements PipeTransform {

  transform(size: number, extension: string = ''): any {

    if (size) {
      if (size < 0) { size = size * -1; }
      const integer = this.formatInt(size.toString().split('.')[0]);
      const decimal = size.toString().split('.')[1] || '';
      return `${integer}${decimal ? '.' + (decimal.length > 2 ? decimal.slice(0, 2) : decimal) : decimal}${extension}`;
    }
  }
  private formatInt(integer: string) {
    let format = integer.length <= 3 ? integer : '';
    let prefix = '';
    for (let i = integer.length; i > 3; i = i - 3) {
      prefix = integer.slice(0, i - 3);
      format = `,${integer.slice(-3)}${format}`;
    }
    return `${prefix}${format}`;
  }

}
