
import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from 'src/app/models/employees.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FilterPanelService } from 'src/app/services/filter-panel.service';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  selectOptions?:string[];
  checkBoxGroup?:any;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnInit,OnChanges {
  checkBoxGroups:any={};
  myForm: FormGroup = this.fb.group({

  });
  
  constructor(private fb: FormBuilder,private employeesService:EmployeeService,private router:Router,private filterPanelService:FilterPanelService) { }
  employees!:Employees[]
  @Input()jsonFormData!:JsonFormData;

  ngOnInit(): void {
    this.employeesService.allEmployees.subscribe((res)=>{
      this.employees=res;
 
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      this.createForm(this.jsonFormData.controls);
    }
  }
  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      if(control.type==='checkbox'){
        this.checkBoxGroups[control.name]=Object.keys(control.checkBoxGroup);
        this.myForm.addControl(
          control.name,
          this.fb.group(control.checkBoxGroup)
        );
      }
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
  
      
    }

  }
  onSubmit() {
    let experience=this.myForm.get('experience')?this.myForm.get('experience')!.value:null;
    let selectedExperiences:string[]=[];
    let experienceQueryString:string="";
    if(experience){
      let experienceKeys=Object.keys(experience);
      experienceKeys.forEach((ele)=>{
        if(experience[ele]){
          selectedExperiences.push(ele)
        }
      })
    }

    selectedExperiences.forEach((ele)=>{
      if(experienceQueryString){
        experienceQueryString=experienceQueryString+","+ele;
      }
      else{
        experienceQueryString=ele;
      }
    })
  
    let formValues:any=[
      this.myForm.get('name')?this.myForm.get('name')!.value:null,
      this.myForm.get('joining date')?this.myForm.get('joining date')!.value:null,
      this.myForm.get('department')?this.myForm.get('department')!.value:null,
      this.myForm.get('salary')?this.myForm.get('salary')!.value:null,
      this.myForm.get('experience')?selectedExperiences:null,
    ]

    this.router.navigate(['./'],{queryParams:{'name':formValues[0],'joining date':formValues[1],'department':formValues[2],'salary':formValues[3],'experience':`${experienceQueryString}`}})
    // filteration Steps;
    this.filterPanelService.filterData(this.employees,formValues)


    
  }
  resetForm(){
    this.myForm.reset();
    this.router.navigate(['']);
    this.employeesService.currentEmployees.next(this.employees);
  }
}
