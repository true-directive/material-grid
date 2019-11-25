/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, HostBinding,
         ChangeDetectorRef,
         ViewChild } from '@angular/core';

import { ColumnType, DetectionMode, SelectionMode } from '@true-directive/base';
import { Column } from '@true-directive/base';
import { FilterOperator, Filter } from '@true-directive/base';

import { GridSettings } from '@true-directive/base';
import { Dates } from '@true-directive/base';
import { Utils } from '@true-directive/base';

import { FilterDateComponent } from '@true-directive/grid';
import { PopupComponent } from '@true-directive/grid';

import { DatepickerMatComponent } from '../../controls/datepicker-mat.component';

@Component({
  selector: 'true-filter-date-mat',
  templateUrl: 'filter-date-mat.component.html',
  styleUrls: ['filter-date-mat.component.scss']
  })
export class FilterDateMatComponent extends FilterDateComponent {

  @ViewChild('firstPicker')
  firstPicker: DatepickerMatComponent;

  selectOpened(e: any) {
    if (e) {
      PopupComponent.freeze++;
    } else {
      PopupComponent.freeze = 0;
    }
  }

  protected focusFirst() {
    if (!Utils.detectMobile()) {
      setTimeout(() => this.firstPicker.focus());
    }
  }

  menuOpened(e: any) {
    PopupComponent.freeze++;
  }

  menuClosed(e: any) {
    PopupComponent.freeze = 0;
  }
}
