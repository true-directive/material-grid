# TrueDirective Material Grid

Material design wrapper for the [TrueDirective Grid](https://https://github.com/true-directive/true-grid).

For displaying grid parts Angular Material components and styles are used  wherever it's possible. All features of the TrueDirective Grid are available:

- Two dimensional virtual scrolling.
- Data [sorting](https://truedirective.com/docs/data-sorting) and [filtering](https://truedirective.com/docs/data-filtering).
- Keyboard interaction.
- [Selection](https://truedirective.com/docs/selection) of data ranges.
- Data autoscrolling on navigation and selection.
- [Data summaries](https://truedirective.com/docs/data-summaries).
- Inline editing.
- Internationalization.

![TrueDirective Material Grid screenshot](https://truedirective.com/assets/material-screen-5.png)

> Keep in mind that rendering of many complex components slows down virtual scrolling. Mainly it concerns the checkboxes in data area.

## Demo

[Live Demo](https://truedirective.com/demo/material).

## Documentation

Documentation is available on the [https://truedirective.com](https://truedirective.com/docs).

## Usage

### 1. Installation

You should have a project with installed Angular Material library to start using TrueDirective Material Grid. So let's create a new project with [Angular CLI](https://cli.angular.io/):

```
ng new test-material-grid --routing false --style scss
```

Run the following command in the folder of the created project:

```
ng add @angular/material
```

Now you can install TrueDirective Material Grid:

```
npm install @true-directive/material-grid --save
```

### 2. Import TrueDirectiveMaterialGridModule

Edit the file `app.module.ts` by adding two lines:

``` ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TrueDirectiveMaterialGridModule } from '@true-directive/material-grid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TrueDirectiveMaterialGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 3. Theming

According to [Theming your Angular Material app](https://material.angular.io/guide/theming) guide define application's theme and include **Material Grid**'s theme styles by changing `styles.scss`:

``` css
// Import library functions for theme creation.
@import '~@angular/material/theming';

// Import TrueDirective Material Grid styles
@import "@true-directive/material-grid/themes/material.scss";

// Include non-theme styles for core.
@include mat-core();

// Define your application's theme.
$primary: mat-palette($mat-indigo);
$accent: mat-palette($mat-pink, A200, A100, A400);
$theme: mat-light-theme($primary, $accent);

// Include theme styles for Angular Material components.
@include angular-material-theme($theme);

// Include theme styles for the TrueDirective Material Grid.
@include true-directive-theme($theme);


html, body { font-size: 14px; }
body { font-family: Roboto, "Helvetica Neue", sans-serif; }
```

Remove existing prebuilt theme from `angular.json` if necessary.

### 4. Use MaterialGridComponent

In order to add the grid into the template of the AppComponent use **true-material-grid** selector. The list of columns, settings and data should be passed in corresponding attributes:

``` ts
import { Component } from '@angular/core';

// Import necessary classes
import * as TD from '@true-directive/material-grid';

@Component({
  selector: 'app-root',
  // Pass the list of columns and data to be displayed in the form of grid
  template: `<div class="mat-elevation-z2">
               <true-material-grid
                 [columns]="columns"
                 [settings]="settings"
                 [data]="data">
               </true-material-grid>
             </div>`,
  styles: [`
    div {
      margin: 15px;
    }
    `]
})
export class AppComponent {

  // Define the list of columns
  columns: TD.Column[] = [
    new TD.Column('publisher'),
    new TD.Column('name'),
    new TD.Column('weight'),
    new TD.Column('flying'),
    new TD.Column('regeneration')
  ];

  // Define the data
  data: any[] = [
    { publisher: 'Marvel comics', name: 'Spider-Man', weight: 76, flying: false, regeneration: true },
    { publisher: 'Marvel comics', name: 'Iron Man', weight: 90, flying: true, regeneration: false },
    { publisher: 'Marvel comics', name: 'Thor', weight: 290, flying: true, regeneration: true },
    { publisher: 'DC comics', name: 'Batman', weight: 95, flying: false, regeneration: false },
    { publisher: 'DC comics', name: 'Superman', weight: 107, flying: true, regeneration: true },
    { publisher: 'DC comics', name: 'Wonder Woman', weight: 75, flying: true, regeneration: false }
  ];

  private _settings: TD.GridSettings = null;
  get settings() {
    if (this._settings === null) {
      this._settings = new TD.GridSettings();
      this._settings.rowHeight = 40;
      this._settings.appearance.verticalLines = false;
    }
    return this._settings;
  }
}

```

Run the project by executing the command ng serve --port=3001 --open. If everything is done properly you'll see the following after you run the project:

![Screenshot 1](http://truedirective.com/assets/m-screen-1.png)

### 5. Define columns' data types and properties

``` ts
...

// Define the list of columns
  columns: TD.Column[] = [
    new TD.Column('publisher', 'Publisher', 150, TD.ColumnType.STRING, 'Hero'),
    new TD.Column('name', 'Name', 150, TD.ColumnType.STRING, 'Hero'),
    new TD.Column('weight', 'Weight', 120, TD.ColumnType.NUMBER, 'Specifications', '{N1-4.2} kg'),
    new TD.Column('flying', 'Flying', 120, TD.ColumnType.BOOLEAN, 'Specifications'),
    new TD.Column('regeneration', 'Regeneration', 120, TD.ColumnType.BOOLEAN, 'Specifications')
  ];

...
```

The results of the changes you made can be found in the browser:

- the width of each column is explicitly defined
- columns' bands (groups of columns)
- displaying the column data correspondingly to its type
- formatting numeric values before displaying (two digits after decimal separator and postfix)

![Screenshot 1](http://truedirective.com/assets/m-screen-2.png)

### 6. Providing Observable object as data source and settings of the grid's height.

Create file hero.model.ts in folder /src/app of the project:

``` ts
export class HeroModel {
  public publisher: string;
  public name: string;
  public weight: number;
  public flying: boolean;
  public regeneration: boolean;

  // Link to the publisher's info
  public publisherUrl: string;
}
```

Import **HttpClientModule** in your AppModule. Edit `app.module.ts`:

``` ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TrueDirectiveMaterialGridModule } from '@true-directive/material-grid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TrueDirectiveMaterialGridModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Edit `app.component.ts`:

``` ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

// Import necessary classes
import * as TD from '@true-directive/material-grid';

// Import model
import { HeroModel } from './hero.model';

@Component({
  selector: 'app-root',
  // Pass the list of columns and data to be displayed in the form of grid
  template: `<div class="mat-elevation-z2">
               <true-material-grid
                 class="test-grid"
                 [columns]="columns"
                 [settings]="settings"
                 [data]="data">
               </true-material-grid>
             </div>`,
  styles: [`
    div {
      margin: 15px;
    }
    .test-grid {
      height: 400px;
    }
    `]
})
export class AppComponent {

  private _columns: TD.Column[] = null;
  public get columns(): TD.Column[] {
    if (this._columns === null) {
      // Define the list of columns
      this._columns = [
        new TD.Column('publisher', 'Publisher', 150, TD.ColumnType.REFERENCE, 'Hero'),
        new TD.Column('name', 'Name', 150, TD.ColumnType.STRING, 'Hero'),
        new TD.Column('weight', 'Weight', 135, TD.ColumnType.NUMBER, 'Specifications', '{N1-4.2} kg'),
        new TD.Column('flying', 'Flying', 135, TD.ColumnType.BOOLEAN, 'Specifications'),
        new TD.Column('regeneration', 'Regeneration', 135, TD.ColumnType.BOOLEAN, 'Specifications')
      ];

      // The link in the first colum will redirect the user to the address
      // in model's property "publisherUrl"
      this._columns[0].referenceField = 'publisherUrl';
      // Sum up third column's values (hero's weight)
      this._columns[2].addSummary(TD.SummaryType.SUM);
    }
    return this._columns;
  }

  // Create Subject and update data on first data inquiery
  private _dataSource: Subject<HeroModel[]> = null;
  get data(): Observable<HeroModel[]> {
    if (this._dataSource === null) {
      this._dataSource = new Subject<HeroModel[]>();
      this.updateData();
    }
    return this._dataSource;
  }

  // Data updating
  private updateData() {
    this.http.get<HeroModel[]>(`https://truedirective.com/api/v1/heroes`).subscribe(data => {
      this._dataSource.next(data);
    });
  }

  private _settings: TD.GridSettings = null;
  get settings() {
    if (this._settings === null) {
      this._settings = new TD.GridSettings();
      this._settings.rowHeight = 38;
      this._settings.appearance.verticalLines = false;

      // Allow user to edit cell value by clicking on the focused cell
      this._settings.editorShowMode = TD.EditorShowMode.ON_CLICK_FOCUSED;

      // Only those cells which are within the limits of the viewport will undergo rendering.
      // During the scrolling new cells will be created and added to DOM.
      // And those cells which are outside the viewport will be removed from DOM and destroyed.
      this._settings.renderMode = TD.RenderMode.VISIBLE;
    }
    return this._settings;
  }

  // Add dependency from HttpClient
  constructor(private http: HttpClient) { }
}
```

As a result you will get a table with 50 rows:

![Screenshot 3](https://truedirective.com/assets/m-screen-3.png)
