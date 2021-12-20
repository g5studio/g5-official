import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { EDevice } from '@utilities/enums/common.enum';
import { WindowHelperService } from '@utilities/helper/window-helper.service';
import { filter, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends UnsubOndestroy implements OnInit {

  @Input() activeRoute: string;
  @ViewChild('tPage') page: ElementRef;

  constructor(
    public $window: WindowHelperService
  ) {
    super();
  }

  get deviceType(): typeof EDevice { return EDevice; }

  ngOnInit(): void {
    this.$window.scrollTop$.pipe(
      takeUntil(this.onDestroy$),
      filter(() => this.page?.nativeElement),
    ).subscribe(top => this.page.nativeElement.scrollTop = top);
  }

}
