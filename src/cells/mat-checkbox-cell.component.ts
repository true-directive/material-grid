/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { GridStateService, Column, ICell } from '@true-directive/grid';

/**
 * Component for displaying a cell with material checkbox .
 */
@Component({
  selector: 'true-cell-mat-cb',
  template: `<mat-checkbox [class.true-cell-mat-cb]="noAnimate"
    [indeterminate]="indeterminate"
    [(ngModel)]="value"
    (click)="cbClick($event)"
    (mousedown)="cbMouseDown($event)"
    (mouseup)="cbMouseUp($event)"
    (touchstart)="cbTouchStart($event)"
    (touchend)="cbTouchEnd($event)"
    [disabled]="disabled"></mat-checkbox>`,
  styleUrls: ['./mat-checkbox-cell.component.scss']
  })
export class MatCheckboxCell implements ICell {

  public noAnimate = true;

  private _value?: boolean;
  public get value(): boolean {
    return this._value;
  }

  public set value(v: boolean) {
    this._value = v;
    this.event.emit(v);
  }

  public get indeterminate(): boolean {
    return this._value === null;
  }

  public event: EventEmitter<any> = new EventEmitter<any>();

  column: Column;
  row: any;
  state: GridStateService;
  disabled: boolean = false;

  cbClick(e: any) {
    e.stopPropagation();
  }

  cbMouseDown(e: any) {
    this.noAnimate = false;
  }

  cbMouseUp(e: any) {
    this.noAnimate = true;
  }

  cbTouchStart(e: any) {
    this.noAnimate = false;
  }

  cbTouchEnd(e: any) {
    this.noAnimate = true;
    e.stopPropagation();
  }

  init(value: any) {
    this._value = value;
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  constructor(private changeDetector: ChangeDetectorRef) { }
}
