/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, True Directive Company.
 * @link https://truedirective.com/
 * @license MIT
*/
import { Directive, ElementRef, Input, EventEmitter, Output,
    Renderer2, Injector,
    ComponentFactoryResolver, ApplicationRef } from '@angular/core';

import { MatCheckboxCell } from './cells/mat-checkbox-cell.component';
import { MatPseudoCheckboxCell } from './cells/mat-pseudo-checkbox-cell.component';

import { Utils, Column, ColumnType } from '@true-directive/base';
import { RowCell, RowDirective } from '@true-directive/grid';

import { EditorTextMatComponent } from './editors/editor-text-mat.component';
import { EditorDateMatComponent } from './editors/editor-date-mat.component';
import { EditorNumberMatComponent } from './editors/editor-number-mat.component';
import { EditorSelectMatComponent } from './editors/editor-select-mat.component';

@Directive({
    selector: '[true-material-row]'
})
export class MaterialRowDirective extends RowDirective {

    protected checkboxType(canEdit: boolean): any {
      if (this.state.settings.checkByCellClick) {
        return MatPseudoCheckboxCell;
      }
      return canEdit ? MatCheckboxCell : MatPseudoCheckboxCell;
    }

    protected getEditorComponentType(col: Column) {
      if (col.type === ColumnType.NUMBER) {
        return EditorNumberMatComponent;
      }
      if (col.type === ColumnType.DATETIME) {
        return EditorDateMatComponent;
      }
      if (col.type === ColumnType.UNSAFE_HTML) {
        return EditorSelectMatComponent;
      }
      return EditorTextMatComponent;
    }

    protected renderCheckbox(cell: RowCell, col: Column, v: any) {

      this._renderer.addClass(cell.element, 'true-cell-custom');

      const componentFactory = this._cfResolver.resolveComponentFactory(this.checkboxType(true));
      const cr: any = componentFactory.create(this._injector, [], cell.element);

      // Initialization
      cr.instance.state = this.state;
      cr.instance.column = col;
      cr.instance.row = this.row;

      cr.instance.init(v);
      cr.instance.detectChanges();

      this._appRef.attachView(cr.hostView);

      // Подтверждение редактирования. Отправляем в данные
      const s = cr.instance.event.subscribe((e: any)=> {
        // вызываем в стэйте
        cell.value = e;
        this.toggleCheckbox.emit({ row: this.row, fieldName: col.fieldName, value: e });
      });

      this._customCellRefs.push(cr);
      this._subscribes.push(s);
    }

    protected renderBoolean(rowData: any, cell: RowCell, col: Column, v: any) {
      this._renderer.addClass(cell.element, 'true-cell-custom');

      const canEdit = this.st.canEditColumnCell(col);

      const componentFactory = this._cfResolver.resolveComponentFactory(this.checkboxType(canEdit));
      const cr: any = componentFactory.create(this._injector, [], cell.element);

      // Initialization
      cr.instance.state = this.state;
      cr.instance.column = col;
      cr.instance.row = this.row;
      cr.instance.disabled = !this.st.canEditColumnCell(col);
      this._appRef.attachView(cr.hostView);

      cr.instance.init(v);
      cr.instance.detectChanges();

      // Подтверждение редактирования. Отправляем в данные
      const s = cr.instance.event.subscribe((e: any)=> {
        // Вызываем в стэйте
        cell.value = e;
        this.toggleCheckbox.emit({ row: this.row, fieldName: col.fieldName, value: e });
      });

      this._customCellRefs.push(cr);
      this._subscribes.push(s);
    }

    protected createTd(span: number) : HTMLElement {
      const tdEl = super.createTd(span);
      tdEl.classList.add('mat-cell');
      return tdEl;
    }

    protected setEditorHeight(cell : RowCell) {
      // Тест, когда всё редакторы
      if (this._height0 === null && this.state.editorHeight !== null) {
        // Если в состоянии сохранена высота, то используем её
        this._height0 = this.state.editorHeight;
      } else {
        // Иначе наоборот - сохраняем высоту
        this.state.editorHeight = this._height0;
        // Необходимо установить высоту ячейки для необузданных material-инпутов
        if (this._height0 >= this.state.settings.rowHeight) {
          cell.element.style.height = (this._height0 /*- 1*/) + 'px';
        }
      }
    }

    protected getDh(): number {
      if (Utils.detectFirefox()) {
        // Underline of input is hidden if it's outside of a cell in FF
        return 0;
      }
      return 1;
    }

    constructor(
      protected _renderer: Renderer2,
      protected _cfResolver: ComponentFactoryResolver,
      protected appRef: ApplicationRef,
      protected injector: Injector,
      public elementRef: ElementRef) {
      super(_renderer, _cfResolver, appRef, injector, elementRef);
    }
}
