import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'allTranslate'
})
export class AllTranslatePipe implements PipeTransform {
  constructor(private $translate: TranslateService) {
  }

  /**
   * @description 將欄位名稱轉換為所有類別，英文字動轉複數字根(僅適用規則型複數單詞)
   * @param field 欄位key值
   * @param currentLan 當前語系
   */
  transform(currentLan: string, field: string): string {
    const Field = this.$translate.instant(field);
    return `${this.$translate.instant('Field.All')}${/en/.test(currentLan) ? this.formatEnRadical(Field) : Field}`;
  }

  /**
   * @description 格式化英文複數字根
   * @param field 原始翻譯
   */
  private formatEnRadical(field: string) {
    return /([^aeiou]+y)$/.test(field) ? `${field.replace(/y$/, 'ies')}` :
      /s$|x$|z$|sh$|ch$/.test(field) ? field + 'es' :
        /f$|fe$/.test(field) ? `${field.replace(/f$|fe$/, 'ves')}` :
          field + 's';
  }

}
