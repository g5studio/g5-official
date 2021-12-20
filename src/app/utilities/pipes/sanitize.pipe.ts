import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  constructor(
    private sanitized: DomSanitizer
  ) { }

  transform(html: string) {
    return this.sanitized.bypassSecurityTrustHtml(html);
  }

}
