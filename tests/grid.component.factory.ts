import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';

import { Column, ColumnType, RenderMode, GridSettings, Keys } from '@true-directive/base';

import { PopupMatComponent } from '../src/controls/popup-mat.component';
import { MaterialGridComponent } from '../src/material-grid.component';


export function triggerEvent(elem:HTMLElement, eventName:string, eventType:string) {
    var event:Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
}

@Component({
  selector: 'test-grid',
  template: `
  <div class="grid-container">
    <true-material-grid #grid
              style=" height: 200px;"
              [columns]="columns"
              [data]="data"
              [settings]="settings">
    </true-material-grid>
  </div>
`,
styles: [`
  .grid-container {
    height: 200px;
  }
  `]
})
export class GridContainer {
    @Output() testOne:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('grid')
    grid: MaterialGridComponent;

    private _columns: Column[] = null;

    get columns() {

      if (this._columns === null) {

        this._columns = [
          new Column('checked', 'Checked', 50, ColumnType.CHECKBOX, 'Data types'),
          new Column('booleanValue', 'Boolean', 100, ColumnType.BOOLEAN, 'Data types'),
          new Column('dateValue', 'Date', 100, ColumnType.DATETIME, 'Data types', 'date'),
          new Column('formatted1', 'Formatted 1', 100, ColumnType.NUMBER, 'Data types', '${D1-4.2}'),
          new Column('formatted2', 'Formatted 2', 100, ColumnType.NUMBER, 'Data types', '{D1-4.2} kg'),
          new Column('name', 'Name', 100, ColumnType.STRING, 'Data types')
        ];

        for (let j = 0; j < 20; j++) {
          const field = `col${j}`;
          const col = new Column(field, field, 120, ColumnType.NUMBER, 'Values');
          this._columns.push(col);
        }
      }
      return this._columns;
    }


    private readonly _data: any[] = [];

    // 100 rows and 20 columns
    get data() {
      if (this._data.length === 0) {

        const date0 = new Date(2019, 0, 1);

        for (let i = 0; i < 100; i++) {
          const row: any = {};
          row.checked = i % 2 > 0;
          row.booleanValue = i % 2 === 0;
          row.dateValue = new Date(2019, 0, 1 + i);
          row.formatted1 = Math.floor(Math.random() * 1000000) / 100.0;
          row.formatted2 = 7000 - Math.floor(Math.random() * 1000000) / 100.0;

          row.name = `row${i}`;

          for (let j = 0; j < 20; j++) {
            const fieldName = `col${j}`;
            row[fieldName] = i * j;
          }
          this._data.push(row);
        }
      }
      return this._data;
    }

    private _settings: GridSettings = null;

    get settings(): GridSettings {
      if (this._settings === null) {
        this._settings = new GridSettings();
        this._settings.rowHeight = 30;
        this._settings.renderMode = RenderMode.VISIBLE;
      }
      return this._settings;
    }

    get resultRows() {
      return this.grid.resultRows;
    }

    public processKey(keyCode: number, shift: boolean = false,  ctrl: boolean = false) {
      this.grid.processKey(Keys.generateEvent(
        null,
        keyCode,
        '',
        shift,
        ctrl
      ));
    }

    public columnByField(field: string) {
      return this.columns.find(c => c.fieldName === field);
    }

    private testOneSuccessCallback($event:any) {
        this.testOne.emit($event);
    }

    constructor() {
      PopupMatComponent.renderToBody = false;
    }
}
