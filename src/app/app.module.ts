import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormModule } from "@form/form/form.module";
import { formValidators } from './services/validators';
@NgModule({
    declarations: [
        AppComponent,
        FilterPanelComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormModule
    ],
    
    providers: [DatePipe,formValidators],
    bootstrap: [AppComponent],
})
export class AppModule { }
