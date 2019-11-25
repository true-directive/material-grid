/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, ViewChild,
         forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatDatepicker } from '@angular/material/datepicker';

import { Keys } from '@true-directive/base';

import { PopupComponent, MaskDateDirective } from  '@true-directive/grid';

@Component({
  selector: 'true-datepicker-mat',
  template: `<mat-form-field>
            <mat-label>{{label}}</mat-label>
            <input type="hidden"
                [matDatepicker]="picker"
                [(ngModel)]="value"
                (dateChange)="datepickerDateChange($event)" />
            <input matInput #input class="true-datepicker-input"
                [(ngModel)]="value"
                [true-mask-date]="pattern"
                (maskValueChanged)="maskValueChanged($event)" />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker (opened)="calendarOpened($event)" (closed)="calendarClosed($event)"></mat-datepicker>
            </mat-form-field>
              `,
  styles: [`
    :host {
      display: inline-block;
    }
    .mat-form-field {
      width: 100%;
    }
    .true-datepicker-input {
      width: 100%;
      height: 100%;
    }
    `],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerMatComponent),
      multi: true}]
})
export class DatepickerMatComponent {

  @ViewChild('input')
  input: any;

  @ViewChild('input', {read: MaskDateDirective})
  maskDateDirective: MaskDateDirective;

  @ViewChild('picker')
  picker: MatDatepicker<any>;

  @Input()
  public pattern = 'dd.MM.yyyy';

  @Input()
  public label = '';

  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  protected _value: any;

  public get value(): any {
    return this._value;
  };

  public set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // Send the value to input. Formatter: Ctrl --> View
  writeValue(value: any): void {
    if (this.value !== value) {
      this.value = value;
    }
  }

  datepickerDateChange(e: any) {
    this.value = e.value;
    this.maskDateDirective.writeValue(this.value);
    setTimeout(() => {
      this.focus();
    });
  }

  calendarOpened(e: any) {
    PopupComponent.freeze++;
  }

  calendarClosed(e: any) {
    PopupComponent.freeze = 0;
  }

  maskValueChanged(v: any) {
    this.value = v;
  }

  public focus() {
    this.input.nativeElement.select();
    this.input.nativeElement.focus();
  }
}
