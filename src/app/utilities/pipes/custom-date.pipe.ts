import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'customDate' })

export class CustomDatePipe extends DatePipe implements PipeTransform {

  constructor() {
    super('en-US');
  }

  transform(value: any, args?: string): any {
    const dateFormat = 'yyyy-MM-dd';
    const reportDateFormat = 'yyyy-MM';
    const mediumTimeFormat = 'HH:mm:ss';
    const shortTimeFormat = 'HH:mm';

    switch (args) {
      case 'mediumDateTime':
        return super.transform(value, `${dateFormat} ${mediumTimeFormat}`);
      case 'shortDateTime':
        return super.transform(value, `${dateFormat} ${shortTimeFormat}`);
      case 'mediumTime':
        return super.transform(value, mediumTimeFormat);
      case 'shortTime':
        return super.transform(value, shortTimeFormat);
      case 'reportDate':
        return super.transform(value, reportDateFormat);
      default:
        return super.transform(value, dateFormat);
    }
  }
}
