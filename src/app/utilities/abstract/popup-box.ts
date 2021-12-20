import { Injectable, ElementRef } from '@angular/core';
import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';

@Injectable()
export abstract class PopupBox extends UnsubOndestroy {
  constructor() {
    super();
  }

  public isOpen = false;
  private menu: any;

  private e = this.detectBlurEvent.bind(this);

  private detectBlurEvent(e: MouseEvent) {
    if (!this.menu.contains(e.target)) {
      this.collapse();
    }
  }


  public expand(menu: ElementRef, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.menu = menu;
    this.isOpen = true;
    addEventListener('click', this.e);
    this.onExpand();
  }

  public collapse(element?: HTMLElement) {
    removeEventListener('click', this.e);
    if (element) { element.blur(); }
    this.isOpen = false;
    if (this.menu) { this.onClose(); }
  }

  protected onClose() { }
  protected onExpand() { }

}
