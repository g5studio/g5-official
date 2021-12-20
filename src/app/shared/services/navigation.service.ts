import { Router, Event, NavigationEnd, NavigationCancel } from '@angular/router';
import { startWith, tap, distinctUntilChanged, scan } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WindowHelperService } from '@utilities/helper/window-helper.service';
import { LoggerService } from '@shared/services/logger.service';
import { IndependentPageMap } from '@utilities/maps/route.map';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private logger: LoggerService,
    private router: Router,
    private $window: WindowHelperService
  ) {
    this.onRouterChanged$.subscribe();
    this.router.errorHandler = this.onNavigationError.bind(this);
  }

  private previousUrl: string;

  private onRouterChanged$ = this.router.events.pipe(
    tap((event) => this.routeHandler(event))
  );

  private route: Subject<string> = new Subject();
  public route$ = this.route.asObservable().pipe(
    startWith(window.location.href.replace(/^http(s)?:\/\/[a-zA-Z0-9\-_.]+:?[0-9]*\//, '').replace(environment.baseHref, '')),
    distinctUntilChanged(),
    scan((previous, current) => {
      this.previousUrl = previous;
      this.logger.systemMessage(previous === '' ? `Auto redirect to ${current}` : `From ${previous} to go ${current}`);
      return current;
    })
  );

  public navigate(path: string) { this.router.navigateByUrl(path); }
  public back() { this.router.navigateByUrl(this.previousUrl); }

  /**
   * @description 檢查當前頁面是否為獨立頁面
   */
  public isIndependentPage(url: string) {
    let isIndependent = false;
    IndependentPageMap.forEach(({ path }) => {
      if (url.includes(path)) {
        isIndependent = true;
      }
    });
    return isIndependent;
  }

  private routeHandler(event: Event) {
    if (event instanceof NavigationEnd) {
      this.onNavigationEnd(event.url);
    } else if (event instanceof NavigationCancel) {
      this.onNavigationCancel(event);
    }
  }

  private onNavigationCancel(event: NavigationCancel) {
    this.navigate(event.url);
  }

  private onNavigationEnd(url: string) {
    this.$window.scrollTo(0);
    url.replace('/', '') ? this.route.next(url.replace('/', ''))
      : this.router.navigateByUrl(environment.defaultPath);
  }

  private onNavigationError(error: string) {
    if (/Cannot match any routes/.test(error)) {
      this.logger.errorMessage('page not found.', null, 'Router');
      this.router.navigateByUrl('404');
    }
  }


}
