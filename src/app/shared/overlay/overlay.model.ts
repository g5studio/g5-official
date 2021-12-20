import { timer, Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

export class PopupMessageController {

  constructor() { }
  public isOpen = false;
  public message: string;
  private interceptor = new Subject();
  private interceptor$ = this.interceptor.asObservable();

  public start(time: number = 0, message?: string) {
    this.isOpen = true;
    this.message = message;
    if (time) {
      timer(time * 1000).pipe(
        takeUntil(this.interceptor$),
        finalize(() => this.close())
      ).subscribe();
    }
  }

  public close() {
    this.interceptor.next();
    this.isOpen = false;
    this.message = null;
  }
}
