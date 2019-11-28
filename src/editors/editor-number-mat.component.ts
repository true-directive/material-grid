/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';

import { Column } from '@true-directive/grid';
import { GridStateService } from '@true-directive/grid';
import { Keys } from '@true-directive/grid';

import { MaskNumberDirective } from '@true-directive/grid';

import { IEditor } from '@true-directive/grid';

import { EditorBaseMatComponent } from './editor-base-mat.component';

@Component({
  selector: 'true-editor-number-mat',
  template: `<mat-form-field class="true-grid__input-container" [style.padding]="getP()">
              <input matInput #input
                class="true-grid-input true-editor-number__input"
                [true-mask-number]="getFormat()"
                [style.height]="getH()"
                [ngClass]="getClass()"
                [(ngModel)]="value"
                (ngModelChange)="inputChange($event)"
                (mousedown)="inputMouseDown($event)"
                (keydown)="inputKeyDown($event)" /></mat-form-field>`,
  styles: [`
    :host {
      padding: 0;
    }
    .true-editor-number__input {
      text-align: right;
    }
    `]
  })
export class EditorNumberMatComponent extends EditorBaseMatComponent {

  ie = false;
  value: number | null = null;
  valueTemp: any;
  valueChanged: boolean;
  format = '{1.2}';
  height = 0;

  @ViewChild('input')
  input: any;

  @ViewChild('input', {read: MaskNumberDirective})
  maskNumberDirective: MaskNumberDirective;

  // Implementation of IEditor
  state: GridStateService;
  column: Column;
  row: any;

  @Output('commit')
  commit: EventEmitter<any> = new EventEmitter();

  @Output('cancel')
  cancel: EventEmitter<void> = new EventEmitter();

  @Output('change')
  change: EventEmitter<any> = new EventEmitter();

  private _initialized = false;
  init(value: any, valueChanged: boolean, height: number, ie: boolean = false, wasShown: boolean = false) {
    this.ie = ie;
    this.valueChanged = valueChanged;
    this.valueTemp = value;
    this.height = height;
  }

  ngAfterContentInit() {
    if(!this.valueChanged) {
      this.value = this.valueTemp;
      setTimeout(() => this.input.nativeElement.select());
      this._initialized = true;
    } else {
      const txt = this.valueTemp;
      setTimeout(() => {
        if (txt !== null && txt !== '') {
          for (let i = 0; i < txt.length; i++) {
            const e = Keys.generateEvent(this.input.nativeElement, 99, txt[i]);
            this.maskNumberDirective.processKey(e);
          }
          this._initialized = true;
          this.inputChange(txt);
        }
        this.input.nativeElement.focus();
      });
    }
  }

  inputMouseDown(e: any) {
    e.stopPropagation();
  }

  inputChange(e: any) {

    if (!this._initialized) {
      return;
    }

    //Только если valid number. Иначе нулл
    if (isNaN(e) || e === '' || e === null) {
      this.change.emit(null);
      return;
    }
    this.change.emit(+e);
  }

  inputKeyDown(e: any) {

    if (e.defaultPrevented) {
      return;
    }

    if (e.keyCode === Keys.UP ||
        e.keyCode === Keys.DOWN ||
        e.keyCode === Keys.PAGE_UP ||
        e.keyCode === Keys.PAGE_DOWN ||
        e.keyCode === Keys.TAB) {
      // По идее просто их должен отработать грид
      return;
    }

    e.stopPropagation();

    if (e.keyCode === Keys.ESCAPE) {
      this.cancel.emit();
      return;
    }

    if (e.keyCode === Keys.ENTER) {
      this.commit.emit(this.value);
      return;
    }
  }

  getFormat() {
    if (this.column.format !== '') {
      return this.column.format;
    }
    return '{1}';
  }

  constructor(protected _renderer: Renderer2) {
    super();
  }
}
