import { Component, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { GridStateService, Column, ICell } from '@true-directive/grid';

/**
 * Component for displaying a cell with material checkbox .
 */
@Component({
  selector: 'true-cell-mat-pseudo-cb',
  template: `<mat-pseudo-checkbox class="true-cell-mat-cb"
    [state]="value ? 'checked' : 'unchecked'"
    [disabled]="disabled"></mat-pseudo-checkbox>`,
  })
export class MatPseudoCheckboxCell implements ICell {

  public noAnimate = true;

  private _value?: boolean;
  public get value(): boolean {
    return this._value;
  }

  public get indeterminate(): boolean {
    return this._value === null;
  }

  public event: EventEmitter<any> = new EventEmitter<any>();

  column: Column;
  row: any;
  state: GridStateService;
  disabled: boolean = false;

  init(value: any) {
    this._value = value;
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  constructor(private changeDetector: ChangeDetectorRef) { }
}
