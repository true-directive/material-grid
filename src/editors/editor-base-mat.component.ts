/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Output, EventEmitter } from '@angular/core';
import { IEditor, Column, GridStateService } from '@true-directive/grid';
import { Utils } from '@true-directive/grid';

export class EditorBaseMatComponent implements IEditor {

  ie: boolean = false;
  value: any = null;
  height: number = 0;

  state: GridStateService;
  column: Column;
  row: any;

  @Output('commit')
  commit: EventEmitter<any> = new EventEmitter();

  @Output('cancel')
  cancel: EventEmitter<void> = new EventEmitter();

  @Output('change')
  change: EventEmitter<any> = new EventEmitter();

  init(value: any, valueChanged: boolean, height: number, ie: boolean = false, wasShown: boolean = false) {
    //
  }

  // Если у нас есть информация о высоте строки - берем её и не
  // назначаем никакого класса
  getClass() {
    if ((this.height !== null && this.height > 0)) {
      return 'true-grid__input-container';
    }
    if (this.ie) {
      return 'true-grid-editor-ie';
    } else {
      return 'true-grid-editor-100p';
    }
  }

  getVAlignClass() {
    if (Utils.detectFirefox()) {
      return 'true-moz-middle';
    }
      return 'true-webkit-middle';
  }

  getH() {
    if (Utils.detectFirefox()) {
      return (this.height - 1) + 'px';
    }
    if (this.height !== null && this.height > 0) {
      return (this.height - 2) + 'px';
    }
    return '100%';
  }

  getP() {
    if (Utils.detectFirefox()) {
      return "1px 0 0 0";
    }
    return "0";
  }
}
