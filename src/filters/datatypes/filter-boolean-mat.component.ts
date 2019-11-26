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
}
