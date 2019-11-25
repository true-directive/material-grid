/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { NgModule, Component, Input, ViewChild, ViewChildren, ChangeDetectorRef,
         ElementRef, Inject, HostBinding } from '@angular/core';

// Теперь наше
import { GridStateService } from '@true-directive/grid';
import { GridLayout } from '@true-directive/base';
import { Column, ColumnType, SummaryType, Summary } from '@true-directive/base';

import { BaseComponent } from '@true-directive/grid';

import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'true-grid-footer-mat',
  templateUrl: './grid-footer-mat.component.html',
  styleUrls: ['./styles/grid-footer-mat.behavior.scss']
})
export class GridFooterMatComponent extends BaseComponent {

  public menuColumn: Column = null;
  public menuSummary: Summary = null;

  @Input('layout')
  layout: GridLayout;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  @ViewChildren('footerCells', {read: MatMenuTrigger})
  footerCells: MatMenuTrigger[];

  readonly summaryTypes = [
    SummaryType.SUM, SummaryType.MIN, SummaryType.MAX,
    SummaryType.COUNT, SummaryType.AVERAGE
  ];

  public isCurrent(c: Column) {
    return this.menuColumn === c;
  }

  public menuClosed() {
    setTimeout(() => {
      this.menuColumn = null;
    }, 50);
    this.changes();
  }

  public tdClick(c: Column) {
    this.menuColumn = c;
    this.menuSummary = c.summaries.length > 0 ? c.summaries[0] : null;
    this.changes();
    if (c.isCheckbox) {
      return;
    }
  }

  public canApply(t: SummaryType): boolean {
    if (!this.menuColumn) {
      return false;
    }
    if (t === SummaryType.SUM || t === SummaryType.AVERAGE) {
      return this.menuColumn.type === ColumnType.NUMBER;
    }
    return true;
  }

  public showMenu(s: Summary, c: Column) {
    this.menuSummary = s;
    this.menuColumn = c;
    let i = 0;
    this.footerCells.forEach(f => {
      if (this.layout.columns[i] === c) {
        f.openMenu();
      }
      i++;
    });
  }

  setAggr(t: SummaryType) {
    if (!this.menuColumn) {
      return;
    }
    this.state.setSummary(this.menuColumn, t, this.menuSummary);
    this.menuColumn = null; // Гасим иконку
    this.changes();
  }

  addAggr(t: SummaryType) {
    if (!this.menuColumn) {
      return;
    }
    this.state.addSummary(this.menuColumn, t);
    this.menuColumn = null;
    this.changes();
  }

  public changes() {
    if (!this.layout) {
      return;
    }
    this.changeDetector.detectChanges();
  }

  constructor(
    @Inject('gridState') public state: GridStateService,
    protected changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef) {
      super();
  }
}
