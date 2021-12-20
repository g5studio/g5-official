import { Injectable, ElementRef } from '@angular/core';
import { EDevice } from '@utilities/enums/common.enum';
import { Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UAParser as UAParserAlias } from 'ua-parser-js';
import { ResizeObserverEntry } from 'resize-observer/lib/ResizeObserverEntry';
import { ResizeObserver } from 'resize-observer';

const DEVICE = {
  XS: 0,
  MD: 767,
  XL: 1200,
  XXL: 1920
};

const MOBILE_AGENT = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];

@Injectable({
  providedIn: 'root'
})

export class WindowHelperService {

  constructor() { }

  get isMobileDevice() { return MOBILE_AGENT.some(agent => window.navigator.userAgent.includes(agent)); }

  public pageWidth: number;

  private device: BehaviorSubject<EDevice> = new BehaviorSubject(this.getDevice());
  public device$ = this.device.asObservable().pipe(
    distinctUntilChanged()
  );

  private scrollTop: Subject<number> = new Subject();
  public scrollTop$ = this.scrollTop.asObservable();

  public scrollTo(top: number) { this.scrollTop.next(top); }

  public isUnsupportBrowser() {
    try {
      const UserAgent = new UAParserAlias.UAParser(window.navigator.userAgent).getResult();
      if (UserAgent.browser.name) {
        switch (UserAgent.browser.name.toLowerCase()) {
          case 'ie':
          case 'baiduboxapp':
            return true;
          case 'firefox':
            return this.getMainVersion(UserAgent.browser.version) < 71;
          case 'edge':
            return this.getMainVersion(UserAgent.browser.version) < 16;
          case 'safari':
          case 'mobile safari':
            if (UserAgent.browser.version) {
              return this.getMainVersion(UserAgent.browser.version) < 11;
            } else if (UserAgent.os.name === 'iOS') {
              return this.getMainVersion(UserAgent.os.version) < 11;
            }

            return false;
          case 'webkit':
            return this.getMainVersion(UserAgent.browser.version) < 604;
          default:
            if (UserAgent.browser.name.toLowerCase() === 'android browser' &&
              ((UserAgent.device.vendor && UserAgent.device.vendor.toLowerCase() === 'huawei') ||
                (!UserAgent.device.vendor && UserAgent.device.model && UserAgent.device.model.toLowerCase() === 'hry-al00a'))) {
              return true;
            }

            if (UserAgent.browser.name.toLowerCase() === 'maxthon' && UserAgent.browser.version === '5.1.60' &&
              UserAgent.os.name === 'Mac OS' && UserAgent.os.version === '10.11.6') {
              return true;
            }

            if (UserAgent.browser.name.toLowerCase() === 'qqbrowserlite' && UserAgent.browser.version === '1.0.4' &&
              UserAgent.os.name === 'Mac OS' && UserAgent.os.version === '10.12.1') {
              return true;
            }

            if (/Chrome/i.test(UserAgent.ua)) {
              // Chrome based: Chrome WebView、Opera、WeChat、2345Explorer、LBBROWSER、Maxthon、MetaSr、QQBrowser、Quark、UCBrowser
              return parseInt(UserAgent.ua.split('Chrome/')[1].split('.')[0], 10) < 71;
            }
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  private getMainVersion(version: string): number {
    if (!version) {
      return 0;
    }
    return parseInt(version.split('.')[0], 10);
  }

  public detectIsCollisionRightBound(e: ElementRef, left?: number): boolean {
    const rect = e.nativeElement.getBoundingClientRect();
    const toLeftBound = left || rect.left;
    const elementWidth = rect.width;
    return (document.body.clientWidth - toLeftBound - elementWidth) < (document.body.clientWidth - this.pageWidth) / 2;
  }

  public detectIsCollisionLeftBound(e: ElementRef): boolean {
    const rect = e.nativeElement.getBoundingClientRect();
    const toRightBound = rect.right;
    const elementWidth = rect.width;
    return (document.body.clientWidth - toRightBound - elementWidth) < (document.body.clientWidth - this.pageWidth) / 2;
  }

  public detectWindowSize() {
    this.device.next(this.getDevice());
  }

  public getDevice() {
    const width = window.innerWidth;
    return (width >= DEVICE.XL ? EDevice.Desktop :
      (width < DEVICE.XL && width >= DEVICE.MD) ? EDevice.Tablet : EDevice.Mobile);
  }

  public getInnerBox(targetDOM: Element): { height: number, width: number } {
    const PaddingTop = parseInt(getComputedStyle(targetDOM).paddingTop, 10);
    const PaddingBottom = parseInt(getComputedStyle(targetDOM).paddingBottom, 10);
    const PaddingLeft = parseInt(getComputedStyle(targetDOM).paddingLeft, 10);
    const PaddingRight = parseInt(getComputedStyle(targetDOM).paddingRight, 10);
    return {
      height: targetDOM.clientHeight - (PaddingTop + PaddingBottom),
      width: targetDOM.clientWidth - (PaddingLeft + PaddingRight)
    };
  }

  public resizeObserver = (callback: (entry: ResizeObserverEntry) => void): ResizeObserver => new ResizeObserver(
    (entrys: ResizeObserverEntry[]) => entrys.forEach(entry => callback(entry))
  )
}
