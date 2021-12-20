import { UnsubOndestroy } from '@utilities/abstract/unsub-ondestroy';
import { Injectable, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export function getNgModelProvider(component: any): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  };
}

@Injectable()
export abstract class AbstractNgModel<T> extends UnsubOndestroy implements ControlValueAccessor {

  constructor() {
    super();
  }

  public model: T;
  public disabled = false;
  private onChange: (value) => {};
  private firstChange = true;


  writeValue(value: T) {
    this.model = value;
    this.onModelChanged({
      value,
      isFirstChange: this.firstChange
    });
    this.firstChange = false;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() { }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public notifyValueChange(value?: any) {
    if (this.onChange) {
      if (typeof value === 'boolean') {
        this.onChange(value);
      } else {
        this.onChange(value || this.model);
      }
    }
  }

  protected onModelChanged({ value, isFirstChange }) { };

}
