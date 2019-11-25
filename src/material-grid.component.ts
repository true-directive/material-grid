import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { MaterialRowDirective } from './material-row.directive';
import { GridFooterMatComponent } from './grid-footer-mat.component';

import { Column, ColumnType, Filter } from '@true-directive/base';
import { GridComponent, GridStateService } from '@true-directive/grid';

import { FilterTextMatComponent } from './filters/datatypes/filter-text-mat.component';
import { FilterBooleanMatComponent } from './filters/datatypes/filter-boolean-mat.component';
import { FilterDateMatComponent } from './filters/datatypes/filter-date-mat.component';
import { FilterNumberMatComponent } from './filters/datatypes/filter-number-mat.component';

// Добавляем features:
//  * группировка
//  * отображение дерева
//  * области для закрепленных колонок
@Component({
  selector: 'true-material-grid',
  templateUrl: './material-grid.component.html',
  providers: [{ provide: 'gridState', useClass: GridStateService }],
  styleUrls: ['./styles/material-grid.behavior.scss'
            ]
})
export class MaterialGridComponent extends GridComponent {

  @ViewChild('gridFooter')
  gridFooter: GridFooterMatComponent;

  @ViewChildren('displayedRows', { read: MaterialRowDirective })
  displayedRowsCenter: QueryList<MaterialRowDirective>;

  doCheckParts() {
    super.doCheckParts();

    if (this.gridFooter && this._initialized) {
      this.gridFooter.changes();
    }
  }

  protected getFilterComponentType(filter: Filter): any {
    let filterType: any = FilterTextMatComponent;

    if (filter.type === ColumnType.NUMBER) {
      filterType = FilterNumberMatComponent;
    }
    if (filter.type === ColumnType.DATETIME) {
      filterType = FilterDateMatComponent;
    }
    if (filter.type === ColumnType.BOOLEAN) {
      filterType = FilterBooleanMatComponent;
    }

    const col: Column = this.state.columnByFieldName(filter.fieldName);

    if (!col) {
      return null;
    }

    if (col.filterComponentType !== null) {
      filterType = col.filterComponentType;
    }
    return filterType;
  }
}
