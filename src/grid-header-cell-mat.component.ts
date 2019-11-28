/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { NgModule, Component, Input, Output, ElementRef, ViewChild,
         EventEmitter, Inject } from '@angular/core';

import { BaseComponent } from '@true-directive/grid';
import { GridStateService, GridHeaderCellComponent } from '@true-directive/grid';
import { ColumnType, GridPart } from '@true-directive/grid';
import { SortType } from '@true-directive/grid';
import { Column } from '@true-directive/grid';


@Component({
  selector: 'true-grid-header-cell-mat',
  templateUrl: './grid-header-cell-mat.component.html',
  host: {
    'class': 'true-header-cell'
  },
  styleUrls: ['./styles/grid-header-cell-mat.behavior.scss']
})
export class GridHeaderCellMatComponent extends GridHeaderCellComponent {

  private _prevChecked = false;
  get isColumnChecked(): boolean {
    if (this.column.isChecked === null) {
      return this._prevChecked;
    }
    this._prevChecked = this.column.isChecked;
    return this.column.isChecked;
  }

  set isColumnChecked(v: boolean) {
    this.toggleCheck(v);
  }

  get isColumnIndeterminate() {
    return this.column.isChecked === null;
  }

  set isColumnIndeterminate(v: boolean) {
    // Nothing to do..
  }

  _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  cbMouseDown(e: any) {
    e.stopPropagation();
  }

  constructor(
    @Inject('gridState') public state: GridStateService,
    public elementRef: ElementRef) {
      super(state, elementRef);
    }
}
