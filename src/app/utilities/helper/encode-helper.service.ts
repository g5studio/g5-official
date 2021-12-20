import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeHelperService {

  constructor() { }


  // test@gmail.com => t***@g****.com
  public encodeEmail(email: string) {
    if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(email)) {
      const ACCOUNT = email.split('@')[0];
      const PROVIDER = email.split('@')[1].split('.')[0];
      const ADDRESS = email.split('@')[1].split('.')[1];
      return `${ACCOUNT[0]}${this.replaceAll(ACCOUNT.slice(1))}@${PROVIDER[0]}${this.replaceAll(PROVIDER.slice(1))}.${ADDRESS}`;
    } else {
      return email;
    }
  }

  // +886-912345678 => +886-****45678 , keep country code and last 5 digit
  public encodeMobile(mobile: string) {
    if (mobile.includes('-')) {
      const CODE = mobile.split('-')[0];
      const NUMBER = mobile.split('-')[1];
      const HIDE = NUMBER.substring(0, NUMBER.length - 5);
      const SHOW = NUMBER.slice(-5);
      return `${CODE}-${this.replaceAll(HIDE)}${SHOW}`;
    } else {
      const HIDE = mobile.substring(0, mobile.length - 5);
      const SHOW = mobile.slice(-5);
      return `${this.replaceAll(HIDE)}${SHOW}`;
    }
  }

  // 12345678 => 1***5678 , keep first and last 4 digit
  public encodePhone(phone: string) {
    const FIRST = phone.slice(0, 1);
    const HIDE = phone.substring(1, phone.length - 4);
    const SHOW = phone.slice(-4);
    return `${FIRST}${this.replaceAll(HIDE)}${SHOW}`;
  }

  private replaceAll(slice: string, symbol = '*') {
    return slice.replace(/./g, symbol);
  }

}
