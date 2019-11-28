/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Output, EventEmitter, OnDestroy,
         ComponentFactoryResolver, Inject,
         ViewContainerRef, ComponentFactory, ChangeDetectorRef,
         ViewChild } from '@angular/core';

import { FilterPopupComponent, GridStateService } from '@true-directive/grid';
import { Column } from '@true-directive/grid';
import { Filter } from '@true-directive/grid';

@Component({
  selector: 'true-filter-popup-mat',
  template: `
    <true-popup-mat #popup (closed)="popupClosed($event)" (show)="popupShow($event)">
      <template #container></template>
    </true-popup-mat>
  `,
  styles:[`
    div {
      position: relative;
    }
    `]
  })
export class FilterPopupMatComponent extends FilterPopupComponent {
  //
}
