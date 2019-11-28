/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, HostBinding,
         ChangeDetectorRef, Renderer2, ViewChild } from '@angular/core';

import { ColumnType, DetectionMode, SelectionMode } from '@true-directive/grid';
import { Column } from '@true-directive/grid';
import { FilterOperator, Filter } from '@true-directive/grid';
import { GridSettings } from '@true-directive/grid';

import { FilterNumberComponent } from '@true-directive/grid';;

import { PopupComponent } from '@true-directive/grid';

@Component({
  selector: 'true-filter-number-mat',
  templateUrl: 'filter-number-mat.component.html',
  styleUrls: ['filter-number-mat.component.scss']
})
export class FilterNumberMatComponent extends FilterNumberComponent {
  protected focusFirst() {
    //
  }
}
