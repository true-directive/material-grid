/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, ViewChild, ContentChild, Renderer2,
         ChangeDetectorRef,
         EventEmitter, ElementRef } from '@angular/core';

import { Utils, Keys } from '@true-directive/grid';
import { PopupComponent } from '@true-directive/grid';

import {
  trigger,
  state,
  style,
  animate,
  query,
  group,
  transition
} from '@angular/animations';

@Component({
  selector: 'true-popup-mat',
  template:  `
    <div [@openClose]="visible ? 'open' : 'closed'" [style.zIndex]="getZ()" class="mat-elevation-z4 true-popup-mat"
      (mousedown)="popupMouseDown($event)"
      (touchstart)="popupTouchStart($event)"
      (keydown)="popupKeyDown($event)" #popup>
      <ng-content #content></ng-content>
     </div>`,
  styles: [
    `
    :host > div {
      position: fixed;
      display: none;
      opacity: 0.0;
    }
    `],
    host: {
      '(touchend)': '$event.stopPropagation()'
    },
    animations: [
      // animation triggers go here
      trigger('openClose', [
        state('closed', style({
          opacity: 0.4,
          transform: 'translateX(15px)'
        })),
        state('open', style({
          opacity: 1.0,
          transform: 'translateX(0)'
        })),
        transition('closed => open', group([
          animate('100ms linear', style({opacity: 1})),
          animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({transform: 'translateX(0)'}))
          ])
        )
    ]),
    ]
})
export class PopupMatComponent extends PopupComponent {

  protected shiftDx = 16;

  protected resetAnimation() {
    // Just overriding. We are using angular animations now.
  }

  protected startAnimation() {
    // Just overriding. We are using angular animations now.
  }

  checkClose(target: any) {
    const l = target;

    if (this._target === l && this.keepOnTargetClick) {
      return false;
    }

    if (this._target && Utils.isAncestor(this._target, l) && this.keepOnTargetClick) {
      return false;
    }

    if (this._target && Utils.isClassDescendant(l, 'mat-datepicker-popup')) {
      return false;
    }

    if (this._target && Utils.isClassDescendant(l, 'mat-select-panel')) {
      return false;
    }

    if (this._target && Utils.isClassDescendant(l, 'mat-menu-panel')) {
      return false;
    }

    if (this._target && Utils.isClassDescendant(l, 'cdk-overlay-backdrop')) {
      return false;
    }

    if (Utils.isAncestor(this.popup.nativeElement, l)) {
      return false;
    } else {
      if (this.zIndex < this.maxZIndex(l)) {
        // Мы кликнули на более высокий уровень
        return false;
      }
    }

    this.closePopup();
    return true;
  }
}
