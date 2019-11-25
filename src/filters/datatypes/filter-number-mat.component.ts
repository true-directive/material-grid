/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, HostBinding,
         ChangeDetectorRef, Renderer2, ViewChild } from '@angular/core';

import { ColumnType, DetectionMode, SelectionMode } from '@true-directive/base';
import { Column } from '@true-directive/base';
import { FilterOperator, Filter } from '@true-directive/base';
import { GridSettings } from '@true-directive/base';
import { Dates } from '@true-directive/base';
import { NumberFormat } from '@true-directive/base';
import { NumberParserFormatter } from '@true-directive/base';

import { FilterNumberComponent } from '@true-directive/grid';;
import { MaskNumberDirective } from '@true-directive/grid';

import { PopupComponent } from '@true-directive/grid';

@Component({
  selector: 'true-filter-number-mat',
  templateUrl: 'filter-number-mat.component.html',
  styleUrls: ['filter-number-mat.component.scss']
})
export class FilterNumberMatComponent extends FilterNumberComponent {

  protected focusFirst() {
    /*
    if (!Utils.detectMobile()) {
      setTimeout(() => this.firstNumber.focus());
    }*/
  }

  menuOpened(e: any) {
    PopupComponent.freeze++;
  }

  menuClosed(e: any) {
    PopupComponent.freeze = 0;
  }
  /*
  // IFilter implementation
  // Initialization
  public init() {
    setTimeout(() => {
      this.selectMode = this.filter.operator === FilterOperator.SET ? true : null;
      this.input1.nativeElement.select();
      this.input1.nativeElement.focus();
    }, 10);
  }

  // Ошибка пользовательского ввода
  inputError1: string = '';
  inputError2: string = '';
  gridError: string = '';

  // Validation
  public validate(): boolean {
    this.inputError1 = '';
    this.inputError2 = '';
    this.gridError = '';

    // Чистим список значений в фильтре
    this.filter.items.splice(0, this.filter.items.length);

    let checkedItems: any[] = []

    if (this.filter.value === null) {
      this.inputError1 = 'Enter first number';
    }

    if (this.filter.value2 === null) {
      this.inputError2 = 'Enter second number';
    }

    if (this.inputError1 != '' || this.inputError2 != '') {
      return false;
    }

    if (this.selectMode) {
      // Добавляем отмеченные при соответствующем режиме
      this.filter.items.splice(0, this.filter.items.length);
      checkedItems.filter(i => i.checked).forEach(i => this.filter.items.push(i.item));
    }

    return true;
  }

  getFormat() {
    if (this.filter.format && this.filter.format != '')
      return this.filter.format;
    return '{1-9.0-4}';
  }

  selectMode: boolean = null;

  operators = [
    FilterOperator.BETWEEN,
    FilterOperator.NOT_BETWEEN
  ];

  @ViewChild('input1') input1: any;
  @ViewChild('input2') input2: any;
  @ViewChild('grid') grid: any;

  private getNumFormat(fmt: string): NumberFormat {
    if (fmt === '') {
      fmt = '{1.0-2}';
    }
    return NumberFormat.parseFormat(fmt);
  }

  private displayedValue(v: number) {
    let nf = this.getNumFormat(this.filter.format);
    return NumberParserFormatter.format(v, nf, this.intl.locale.separators);
  }

  inputFocus(e: any) {
    const txt = e.target.value;
    this._renderer.setProperty(e.target, 'selectionStart', 0);
    this._renderer.setProperty(e.target, 'selectionEnd', txt.length);
  }

  constructor(
    protected _renderer: Renderer2,
    protected intl: InternationalizationService) {
    super(intl);
  }
  */
}
