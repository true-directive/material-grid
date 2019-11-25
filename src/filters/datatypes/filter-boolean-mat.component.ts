/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, HostBinding,
         ChangeDetectorRef, Renderer2, ViewChild } from "@angular/core";

import { FilterOperator } from '@true-directive/base';

import { FilterBooleanComponent } from '@true-directive/grid';
// import { InternationalizationService } from '../../internationalization/internationalization.service';

@Component({
  selector: "true-filter-boolean-mat",
  templateUrl: "filter-boolean-mat.component.html",
  styleUrls: ["filter-boolean-mat.component.scss"]
})
export class FilterBooleanMatComponent extends FilterBooleanComponent {

  // Initialization
  public init() {
    // Nothing to do...
  }
/*
  // IFilter implementation
  // Initialization
  public init() {
    setTimeout(() => {
      this.cb1.nativeElement.focus();
    }, 10);
  }

  // Validation
  public validate(): boolean {
    // Если ни одна галка не помечена -- выводим пустые значения
    if (this.filter.operator === FilterOperator.SET && this.filter.items.length === 0) {
      this.filter.items.push(null);
      if (this.trueValues || this.falseValues) {
        // Если что-то помечено, то нулл не выводим
        if (this.filter.items.indexOf(null) >= 0) {
          this.filter.items.splice(this.filter.items.indexOf(null), 1);
        }
      }
    }
    return true;
  }

  @ViewChild("cb1")
  cb1: any;

  get trueValues(): boolean  {
    if (this.filter.operator === FilterOperator.SET) {
      return this.filter.items.indexOf(true) >= 0;
    }
    return this.filter.value === true;
  }

  set trueValues(v: boolean) {
    const vFalse = this.falseValues;

    this.filter.operator = FilterOperator.SET;
    this.filter.clearItems();
    if (vFalse) {
      this.filter.items.push(false);
    }
    if (v) {
      this.filter.items.push(true);
    }
  }

  get falseValues(): boolean  {
    if (this.filter.operator === FilterOperator.SET) {
      return this.filter.items.indexOf(false) >= 0;
    }
    return this.filter.value === false;
  }

  set falseValues(v: boolean) {
    const vTrue = this.trueValues;

    this.filter.operator = FilterOperator.SET;
    this.filter.clearItems();
    if (vTrue) {
      this.filter.items.push(true);
    }
    if (v) {
      this.filter.items.push(false);
    }
  }

  constructor(
    protected intl: InternationalizationService) {
    super(intl);
  }*/
}
