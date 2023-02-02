import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { JsonFormComponent } from './filter-panel/json-form/json-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPanelComponent,
    EmployeesTableComponent,
    JsonFormComponent
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule
 

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
