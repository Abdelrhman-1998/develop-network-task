import { Component, OnInit,ViewChild } from '@angular/core';
import { JsonFormData }  from '@form/form/models/form.model';
import {MatAccordion} from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit{

  constructor(private http:HttpClient) { }

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  formData1!: JsonFormData;
  formData2!: JsonFormData;
  formResults:any;
  
  ngOnInit(): void {
    this.http.get<JsonFormData>('../../assets/filter-panel.json').subscribe((res)=>{
      console.log(res)
      this.formData1=res;
    });
    this.http.get<JsonFormData>('../../assets/filter-panel copy.json').subscribe((res)=>{
      console.log(res)
      this.formData2=res;
    });
  }
  submitForm(form:FormGroup){
    console.log(form.value)
    
  }
 resetForm(form:FormGroup){
    form.reset();
  }

}
