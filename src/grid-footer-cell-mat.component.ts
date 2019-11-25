/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { NgModule, Component, Input, Output, ViewChild,
         Inject,
         EventEmitter } from '@angular/core';

import { GridStateService } from '@true-directive/grid';
import { Column, ColumnType, SummaryType, Summary } from '@true-directive/base';

@Component({
  selector: 'true-grid-footer-cell-mat',
  templateUrl: './grid-footer-cell-mat.component.html',
  styleUrls: ['./styles/grid-footer-cell-mat.behavior.scss'],
  host: {
    '[class.num]': 'column.isNumeric',
    '[class.h100]': 'column.summaries.length<=1'
  }
})
export class GridFooterCellMatComponent {

  @Input('column')
  public column: Column;

  @Output()
  needMenu: EventEmitter<Summary> = new EventEmitter<Summary>();

  @ViewChild('btn')
  btn: any;

  @ViewChild('menu')
  menu: any;

  public displayedValue(a: Summary): string {
    if (a.type != SummaryType.COUNT && this.column.format != '') {
      return this.state.dataSource.displayedValue(this.column, a.value, null);
    }
    return a.value;
  }

  public summaryMouseDown(e: any) {
    e.stopPropagation();
  }

  public summaryTouchStart(e: any) {
    e.stopPropagation();
  }

  public toggleMenu(e: any, a: Summary = null) {
    this.needMenu.emit(a);
    e.stopPropagation();
    e.preventDefault();
  }

  constructor(
    @Inject('gridState') public state: GridStateService) { }
}
