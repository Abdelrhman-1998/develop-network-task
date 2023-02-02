import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { JsonFormData } from './json-form/json-form.component';
import {MatAccordion} from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  constructor(private http:HttpClient) { }
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  formData!: JsonFormData;

  formResults:any;

  ngOnInit(): void {
    this.http.get<JsonFormData>('../../assets/filter-panel.json').subscribe((res)=>{

      this.formData=res;
    })
  }

}
