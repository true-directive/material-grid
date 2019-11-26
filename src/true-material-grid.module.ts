/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { TrueDirectiveGridModule } from '@true-directive/grid';
import { GridHeaderBandComponent } from '@true-directive/grid';

import { TranslatePipe } from '@true-directive/grid';

import { MaterialGridComponent } from './material-grid.component';
import { MaterialRowDirective } from './material-row.directive';

import { GridHeaderMatComponent } from './grid-header-mat.component';
import { GridHeaderCellMatComponent } from './grid-header-cell-mat.component';

import { GridFooterMatComponent } from './grid-footer-mat.component';
import { GridFooterCellMatComponent } from './grid-footer-cell-mat.component';

import { EditorTextMatComponent } from './editors/editor-text-mat.component';
import { EditorDateMatComponent } from './editors/editor-date-mat.component';
import { EditorNumberMatComponent } from './editors/editor-number-mat.component';

import { MatCheckboxCell } from './cells/mat-checkbox-cell.component';
import { MatPseudoCheckboxCell } from './cells/mat-pseudo-checkbox-cell.component';

import { PopupMatComponent } from './controls/popup-mat.component';
import { DialogWrapperMatComponent } from './controls/dialog-wrapper-mat.component';
import { DatepickerMatComponent } from './controls/datepicker-mat.component';

import { FilterPopupMatComponent } from './filters/filter-popup-mat.component';
import { FilterBooleanMatComponent } from './filters/datatypes/filter-boolean-mat.component';
import { FilterDateMatComponent } from './filters/datatypes/filter-date-mat.component';
import { FilterNumberMatComponent } from './filters/datatypes/filter-number-mat.component';
import { FilterTextMatComponent } from './filters/datatypes/filter-text-mat.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({

  imports: [ FormsModule, CommonModule, TrueDirectiveGridModule,
    MatButtonModule, MatCheckboxModule, MatIconModule, MatPseudoCheckboxModule,
    MatRippleModule, MatMenuModule, MatDividerModule, MatInputModule,
    MatDatepickerModule, MatSelectModule, MatNativeDateModule,
    MatNativeDateModule
  ],

  providers: [],

  declarations: [
    MaterialGridComponent, MaterialRowDirective,
    MatCheckboxCell, MatPseudoCheckboxCell,

    GridHeaderMatComponent,
    GridHeaderCellMatComponent,

    GridFooterMatComponent,
    GridFooterCellMatComponent,

    EditorTextMatComponent, EditorDateMatComponent, EditorNumberMatComponent,
    PopupMatComponent,
    DialogWrapperMatComponent,
    DatepickerMatComponent,

    FilterPopupMatComponent,
    FilterBooleanMatComponent,
    FilterDateMatComponent,
    FilterNumberMatComponent,
    FilterTextMatComponent
  ],

  entryComponents: [ MatCheckboxCell, MatPseudoCheckboxCell,
    EditorTextMatComponent, EditorDateMatComponent, EditorNumberMatComponent,
    FilterBooleanMatComponent, FilterDateMatComponent,
    FilterNumberMatComponent, FilterTextMatComponent ],

  exports: [
    MaterialGridComponent,
    MaterialRowDirective
  ]
})
export class TrueDirectiveMaterialGridModule { }
