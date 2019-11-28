/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, HostBinding,
         ChangeDetectorRef,
         ViewChild } from '@angular/core';

import { ColumnType, DetectionMode, SelectionMode } from '@true-directive/grid';
import { Column } from '@true-directive/grid';
import { FilterOperator, Filter } from '@true-directive/grid';

import { GridSettings } from '@true-directive/grid';
import { Dates } from '@true-directive/grid';
import { Utils } from '@true-directive/grid';

import { FilterDateComponent } from '@true-directive/grid';

import { DatepickerMatComponent } from '../../controls/datepicker-mat.component';

@Component({
  selector: 'true-filter-date-mat',
  templateUrl: 'filter-date-mat.component.html',
  styleUrls: ['filter-date-mat.component.scss']
  })
export class FilterDateMatComponent extends FilterDateComponent {

  @ViewChild('firstPicker')
  firstPicker: DatepickerMatComponent;

  protected focusFirst() {
    if (!Utils.detectMobile()) {
      setTimeout(() => this.firstPicker.focus());
    }
  }
}
