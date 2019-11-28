/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { Column } from '@true-directive/base';
import { IEditor, GridStateService } from '@true-directive/grid';
import { Keys, Utils } from '@true-directive/base';

import { EditorBaseMatComponent } from './editor-base-mat.component';

@Component({
  selector: 'true-editor-select-mat',
  template: `<mat-form-field class="true-grid__input-container" [ngClass]="getVAlignClass()">
          <mat-select  #input
              class="true-grid-input"
              [ngClass]="getClass()"
              (keydown)="inputKeyDown($event)"
              [style.line-height]="getH()"
              [style.height]="getH()"
              [(value)]="editValue">
            <mat-option *ngFor="let item of items" [value]="itemValue(item)">
              {{itemDisplayValue(item)}}
            </mat-option>
          </mat-select>
        </mat-form-field>`,
  styles: [`
    :host {
      padding: 0;
    }
    `]
  })
export class EditorSelectMatComponent extends EditorBaseMatComponent implements /*IEditor,*/ OnDestroy  {

  protected destroy$: Subject<boolean> = new Subject<boolean>();

  /*
  ie: boolean = false;
  value: any = null;
  height: number = 0;
  */
  @ViewChild('input') input: any;

  // Implementation of IEditor
  state: GridStateService;
  column: Column;
  row: any;

  @Output("commit")
  commit: EventEmitter<any> = new EventEmitter();

  @Output("cancel")
  cancel: EventEmitter<any> = new EventEmitter();

  @Output("change")
  change: EventEmitter<any> = new EventEmitter();

  get editValue() {
    return this.value;
  }

  set editValue(v: any) {
    this.value = v;
    this.change.emit(v);
  }

  /**
   * Данные выпадающего списка
   */
  private _items: any[] = null;
  get items(): any[] {
    if (this._items === null) {
      if (this.column.optionsData instanceof Observable) {
        // Подпись
        const observable = <Observable<any>>this.column.optionsData;
        observable.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this._items = data;
        });
      } else {
        this._items = this.column.optionsData;
      }
    }
    return this._items;
  }

  itemValue(item: any): any {
    return item[this.column.optionsColumns[0].fieldName];
  }

  itemDisplayValue(item: any): any {
    return item[this.column.optionsColumns[0].fieldName];
  }

  init(value: any, valueChanged: boolean, height: number, ie: boolean = false, wasShown: boolean = false) {
    this.ie = ie;
    this.value = value;
    if (valueChanged) {
      this.editValue = null;
    }
    this.height = height;
    setTimeout(() =>  {
      this.input.focused = true;
    }, 10);
  }

  setValueAndFocus(value: any, selectAll: boolean = false) {
    this.input.nativeElement.focus();
  }

  inputMouseDown(e: any) {
    e.stopPropagation();
  }

  processKey(keyEvent: any) {
    //
  }

  inputKeyDown(e: any) {

    if (e.keyCode === Keys.TAB) {
      return;
    }

    e.stopPropagation();

    if (e.keyCode === Keys.ESCAPE) {
      this.cancel.emit(false);
      return;
    }

    if (e.keyCode === Keys.ENTER) {
      this.commit.emit(this.value);
      return;
    }
  }

  inputBlur(e: any) {
    this.cancel.emit(true);
  }

  ngOnDestroy() {
    // Если нас удаляют...
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
