import { async, inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { ScrollerComponent } from '@true-directive/grid';

import { MaterialGridComponent } from '../src/material-grid.component';

import { GridHeaderBandComponent } from '@true-directive/grid';
import { GridHeaderMatComponent } from '../src/grid-header-mat.component';
import { GridHeaderCellMatComponent } from '../src/grid-header-cell-mat.component';
import { GridFooterMatComponent } from '../src/grid-footer-mat.component';
import { GridFooterCellMatComponent } from '../src/grid-footer-cell-mat.component';

import { MaterialRowDirective } from '../src/material-row.directive';

// Filters
import { FilterPopupMatComponent } from '../src/filters/filter-popup-mat.component';

import { FilterTextMatComponent } from '../src/filters/datatypes/filter-text-mat.component';
import { FilterDateMatComponent } from '../src/filters/datatypes/filter-date-mat.component';
import { FilterNumberMatComponent } from '../src/filters/datatypes/filter-number-mat.component';
import { FilterBooleanMatComponent } from '../src/filters/datatypes/filter-boolean-mat.component';

// Editors
import { EditorTextMatComponent } from '../src/editors/editor-text-mat.component';
import { EditorDateMatComponent } from '../src/editors/editor-date-mat.component';
import { EditorNumberMatComponent } from '../src/editors/editor-number-mat.component';

// Cells
import { MatCheckboxCell } from '../src/cells/mat-checkbox-cell.component';
import { MatPseudoCheckboxCell } from '../src/cells/mat-pseudo-checkbox-cell.component';

// Popup&Menu
import { PopupMatComponent } from '../src/controls/popup-mat.component';

// controls
import { DatepickerMatComponent } from '../src/controls/datepicker-mat.component';
import { DialogWrapperMatComponent } from '../src/controls/dialog-wrapper-mat.component';

// Masked input directives
import { MaskDateDirective, MaskNumberDirective } from '@true-directive/grid';

import { TranslatePipe } from '@true-directive/grid';

import { GridStateService } from '@true-directive/grid';
import { InternationalizationService } from '@true-directive/grid';

import { SortInfo, SortType, Filter, FilterOperator, SummaryType, Keys, EditorShowMode } from '@true-directive/base';

import { GridContainer, triggerEvent } from './grid.component.factory';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

describe('Grid', () => {

    let componentFixture: ComponentFixture<GridContainer>;
    let container: GridContainer;
    let intl: InternationalizationService = new InternationalizationService();
    let gridState: GridStateService = new GridStateService(intl);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, CommonModule, BrowserAnimationsModule,
              MatDatepickerModule,
              MatButtonModule, MatCardModule, MatCheckboxModule, MatRadioModule,
              MatPseudoCheckboxModule, MatRippleModule, MatMenuModule,
              MatInputModule, MatSelectModule, MatIconModule, MatDividerModule],
            declarations: [
              ScrollerComponent, MaterialGridComponent,
              GridHeaderMatComponent, GridHeaderCellMatComponent, GridHeaderBandComponent,
              GridFooterMatComponent, GridFooterCellMatComponent,
              MaterialRowDirective,
              DatepickerMatComponent, DialogWrapperMatComponent,

              // Filters
              FilterPopupMatComponent,
              FilterTextMatComponent, FilterDateMatComponent, FilterNumberMatComponent, FilterBooleanMatComponent,

              // Editors
              EditorTextMatComponent, EditorDateMatComponent, EditorNumberMatComponent,

              // Cells
              MatCheckboxCell, MatPseudoCheckboxCell,

              // Popup&Menu
              PopupMatComponent,

              // Input masking
              MaskNumberDirective, MaskDateDirective,

              // Translate pipe
              TranslatePipe,

              GridContainer
            ],
            providers: [
               { provide: 'gridState', useValue: gridState },
               InternationalizationService
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
          set: {
            entryComponents: [
              MatCheckboxCell,
              MatPseudoCheckboxCell,
              EditorTextMatComponent,
              FilterBooleanMatComponent ],
          }
        }).compileComponents().then(() => {
            componentFixture = TestBed.createComponent(GridContainer);
            componentFixture.detectChanges();
            container = <GridContainer>componentFixture.componentInstance;
        })
    }));

    afterEach(function() {
      gridState.settings.showHeader = true;
      gridState.settings.showFooter = true;
      container.columnByField('col1').clearSummaries();
      container.grid.filter([]);
      container.grid.clearSelection();
    });

    it('should be defined', () => {
        componentFixture.detectChanges();
        expect(componentFixture).toBeDefined();
      }
    );

    it('rendered visible rows', () => {
        expect(container.grid.visibleRows.length < 20).toBeTruthy();
      }
    );

    it('sort by column', async(() => {
      container.grid.sort([new SortInfo('col1', SortType.DESC)], false);
      container.grid.updateData(false);
      componentFixture.whenStable().then(() => {
        expect(container.grid.resultRows[0].col1).toBe(99);
      });
    }));

    it('filter by boolean value', async(() => {
      const f: Filter = container.columnByField('booleanValue')
                      .createFilter(true, FilterOperator.EQUALS);
      container.grid.filter([f], false);
      container.grid.updateData(false);
      componentFixture.whenStable().then(() => {
        expect(container.grid.resultRows.length).toBe(50);
      });
    }));

    it('select first row', async(() => {

      const firstRow = container.grid.resultRows[0];
      container.grid.locateRow(firstRow);

      componentFixture.whenStable().then(() => {
        expect(container.grid.state.selection.ranges.length).toBe(1);
      });
    }));

    it('select ranges', async(() => {

      const row1 = container.grid.resultRows[1];
      const row2 = container.grid.resultRows[2];
      const row3 = container.grid.resultRows[3];
      const row4 = container.grid.resultRows[4];

      // First range
      container.grid.startSelect(container.grid.cellPosition(row1, 'name'));
      // End of the first range
      container.grid.proceedToSelect(container.grid.cellPosition(row3, 'col1'));
      // Add second range
      container.grid.startSelect(container.grid.cellPosition(row2, 'booleanValue'), true);
      // End of the second range
      container.grid.proceedToSelect(container.grid.cellPosition(row4, 'col5'));

      componentFixture.whenStable().then(() => {
        expect(container.grid.state.selection.ranges.length).toBe(2);
      });
    }));


    it('summaries', async(() => {

      const col = container.columnByField('col1');
      col.addSummary(SummaryType.MIN);
      container.grid.state.addSummary(col, SummaryType.MAX);
      container.grid.state.addSummary(col, SummaryType.SUM);
      container.grid.state.addSummary(col, SummaryType.AVERAGE);
      container.grid.state.addSummary(col, SummaryType.COUNT);

      componentFixture.whenStable().then(() => {
        expect(col.summaries.length).toBe(5);
        expect(col.summaries[0].value).toBe(0);
        expect(col.summaries[1].value).toBe(99);
        expect(col.summaries[2].value).toBe(4950);
        expect(col.summaries[3].value).toBe(49.5);
        expect(col.summaries[4].value).toBe(100);
      });
    }));


    it('edit', async(() => {
      container.grid.settings.editorShowMode = EditorShowMode.ON_CLICK_FOCUSED;

      container.processKey(Keys.DOWN);
      container.processKey(Keys.RIGHT);
      container.processKey(Keys.RIGHT);
      container.processKey(Keys.RIGHT);
      container.processKey(Keys.RIGHT);
      container.processKey(Keys.RIGHT);
      expect(container.grid.state.focusedCell.fieldName).toBe('name');
      container.processKey(Keys.ENTER);
      const editingCell = container.grid.state.editor;
      expect(editingCell.fieldName).toBe('name');
      container.grid.state.stopEditing(editingCell, true, true);
      expect(container.grid.state.editor).toBeNull();
    }));

    it('keys', async(() => {

      container.processKey(Keys.DOWN);

      expect(container.grid.state.focusedCell.fieldName).toBe('checked');

      container.processKey(Keys.DOWN);
      expect(container.grid.state.focusedCell.row).toBe(container.data[1]);

      container.processKey(Keys.PAGE_UP);
      expect(container.grid.state.focusedCell.row).toBe(container.data[0]);

      container.processKey(Keys.END);

      expect(container.grid.state.focusedCell.fieldName).toBe('col19');
      expect(container.grid.state.focusedCell.row).toBe(container.data[0]);

      container.processKey(Keys.END, false, true);

      expect(container.grid.state.focusedCell.row).toBe(container.data[99]);
    }));

    it('filter show', (done) => {
      let filterBtn: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('.true-header-button-mat');
      let booleanFilter: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('.true-filter-boolean__checkboxes');
      expect(booleanFilter).toBeNull();

      triggerEvent(filterBtn, 'click', 'MouseEvent');
      setTimeout(() => {
        let booleanFilter2 = componentFixture.elementRef.nativeElement.querySelector('.true-filter-boolean__checkboxes');
        expect(booleanFilter2).not.toBeNull();
        container.grid.filterPopup.closePopup();
        done();
      }, 100);
    });
});
