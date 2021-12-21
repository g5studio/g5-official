import { Component, OnInit } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { interval, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends UnsubOndestroy implements OnInit {

  constructor() {
    super();
  }

  public current: number = 0;

  private timer$ = interval(3000).pipe(takeUntil(this.onDestroy$));
  private subscription = new Subscription();

  ngOnInit(): void {
    this.start();
  }

  public onTouch(offset: number) {
    if (offset > 20) {
      this.select(this.current - 1 < 0 ? 2 : this.current - 1);
    } else if (offset < -20) {
      this.select(this.current + 1 >= 3 ? 0 : this.current + 1);
    }
  }

  public select(index: number) {
    this.subscription.unsubscribe();
    this.current = index;
    this.start();
  }


  private start() {
    this.subscription = this.timer$.subscribe(() => this.current = this.current + 1 >= 3 ? 0 : this.current + 1);
  }

}
