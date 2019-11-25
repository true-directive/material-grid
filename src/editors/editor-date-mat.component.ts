/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { MatDatepicker } from '@angular/material/datepicker';

import { Column } from '@true-directive/base';
import { Keys } from '@true-directive/base';

import { GridStateService } from '@true-directive/grid';
import { MaskDateDirective, IEditor } from  '@true-directive/grid';

@Component({
  selector: 'true-editor-date-mat',
  template:
      `<mat-form-field class="true-grid__input-container">
              <input type="hidden" [matDatepicker]="picker" [(ngModel)]="value" (dateChange)="datepickerDateChange($event)">
              <input matInput #input class="true-grid-input"
                  [style.height]="getH()"
                  [ngClass]="getClass()"
                  [(ngModel)]="value"
                  [true-mask-date]="column.format"
                  (maskValueChanged)="maskValueChanged($event)"
                  (mousedown)="inputMouseDown($event)"
                  (keydown)="inputKeyDown($event)" />
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
       </mat-form-field>`,
  styles: [`
    :host {
      padding: 0;
    }
    .true-grid__input-container {
      width: 100%;
    }
    /deep/ .true-grid__input-container .mat-icon-button {
      margin-right: 4px;
    }
    `]
  })
export class EditorDateMatComponent implements IEditor  {

  ie: boolean;
  value: any = null;
  valueTemp: any;
  valueChanged: boolean;
  height: number;

  datepickerInputClass = 'true-grid-input';

  @ViewChild('input')
  input: any;

  @ViewChild('input', {read: MaskDateDirective})
  maskDateDirective: MaskDateDirective;

  @ViewChild('picker')
  picker: MatDatepicker<any>;

  // Implementation of IEditor
  state: GridStateService;
  column: Column;
  row: any;

  @Output("commit")
  commit: EventEmitter<any> = new EventEmitter();

  @Output("cancel")
  cancel: EventEmitter<any> = new EventEmitter();

  @Output("change")
  change: EventEmitter<any> = new EventEmitter();

  private _initialized = false;
  init(value: any, valueChanged: boolean, height: number, ie: boolean = false, wasShown: boolean = false) {
    this.ie = ie;
    this.valueTemp = value;
    this.valueChanged = valueChanged;
    this.height = height;
  }

  ngAfterContentInit() {
    if(!this.valueChanged) {
      this.value = this.valueTemp;
      // The pattern hasn't applied yet.
      this.maskDateDirective.pattern = this.column.format;
      this.maskDateDirective.writeValue(this.value);
      setTimeout(() => {
        this.input.nativeElement.select()
        this.input.nativeElement.focus();
      });
      this._initialized = true;
    } else {
      this.input.nativeElement.focus();
      const txt = this.valueTemp;
      setTimeout(() => {
        for (let i = 0; i < txt.length; i++) {
          const e = Keys.generateEvent(null, 0, txt[i]);
          this.acceptKey(e);
        }
        this._initialized = true;
      });
    }
  }

  acceptKey(e: any) {
    this.maskDateDirective.keyDown(
      Keys.generateEvent(this.input.nativeElement, -1, Keys.keyChar(e), e.shiftKey, e.ctrlKey)
    );
  }

  datepickerDateChange(e: any) {
    this.value = e.value;
    this.maskDateDirective.writeValue(this.value);
    this.inputChange(this.value);
    setTimeout(() => {
      this.input.nativeElement.select();
      this.input.nativeElement.focus();
    });
  }

  maskValueChanged(v: any) {
    this.inputChange(v);
  }

  inputChange(v: any) {
    if (this._initialized) {
      this.change.emit(this.purify(v));
    }
  }

  inputMouseDown(e: any) {
    e.stopPropagation();
  }

  inputKeyDown(e: any) {
    
    if (e.keyCode === Keys.DOWN && e.altKey) {
      this.picker.open();
      e.stopPropagation();
      return;
    }

    if (e.keyCode === Keys.UP || e.keyCode === Keys.DOWN || e.keyCode === Keys.TAB) {
      return;
    }

    if (e.keyCode === Keys.ESCAPE) {
      this.cancel.emit(false);
      return;
    }

    e.stopPropagation();

    if (e.keyCode === Keys.ENTER) {
      this.commit.emit(this.purify(this.value));
      return;
    }
  }

  getClass() {
    let res = 'true-editor-date__datepicker';
    if (this.height !== null && this.height > 0) {
      return res;
    }

    if (this.ie) {
      return res + ' true-grid-editor-ie';
    } else {
      return res + ' true-grid-editor-100p';
    }
  }

  getH() {
    if (this.height !== null && this.height > 0) {
      return (this.height - 2) + 'px';
    }
    return '100%';
  }

  protected purify(v: any): any {
    if (v === undefined || v === null || isNaN(v.getTime())) {
      return null;
    }
    return v;
  }
}
