import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startWith, Subscription,map } from 'rxjs';
import { JsonFormControls } from '../models/form.model';
import { formValidators } from 'src/app/services/validators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class formService {
  checkBoxGroups:any={};
  myForm: FormGroup = this.fb.group({});
  subscriptions:Subscription[]=[];
  selectSearch:{[contorlName:string]:string[]}={};
  asynchSelectSearch:{[contorlName:string]:string[]}={};
  formIcons:{[key:string]:string}={passwordIcon:'visibility_off'};

  constructor(private fb: FormBuilder,private http:HttpClient,private asyncValidators:formValidators) { 

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
  
      if(control.hasAsyncValidators){ 
        // to add class validators
        const subscription1=this.myForm.get(control.name)?.valueChanges.subscribe((res)=>{
            let x=this.asyncValidators as any;
            x[control.name]=res;
            this.asyncValidators=x;
            this.asyncValidators.validate(this.asyncValidators,this.myForm)
      
        })
        if(subscription1){
          this.subscriptions.push(subscription1);
        }
 
      } 
      if(control.type==='select-search'){
        let filteredOptions;
        if(control.hasAsyncSearch){
          this.http.get<string[]>(control.asyncSelectOptions??'').subscribe((res)=>{
            this.asynchSelectSearch[control.name]=res;
        
            filteredOptions=this.myForm.get(control.name)!.valueChanges.pipe(
              startWith(''),
              map(value => this. autoCompleteFilter(value || '',control))
            ).subscribe((res)=>{
               this.selectSearch[control.name]=res;
            });
            this.subscriptions.push(filteredOptions);
          })
        }else{
          filteredOptions = this.myForm.get(control.name)!.valueChanges.pipe(
            startWith(''),
            map(value => this. autoCompleteFilter(value || '',control))
          ).subscribe((res)=>{
             this.selectSearch[control.name]=res;
            
          });
          this.subscriptions.push(filteredOptions);
        }
  

       } 
     
    }
    return {
      form:this.myForm,
      subscriptions:this.subscriptions,
      checkBoxGroups:this.checkBoxGroups,
      selectSearch:this.selectSearch
    }
  }
  autoCompleteFilter(value: string,control:JsonFormControls){
      const filterValue = value.toLowerCase();
      if(control.hasAsyncSearch){
        // API
        return this.asynchSelectSearch[control.name].filter(option => option.toLowerCase().includes(filterValue));
      }else{
        return control.selectOptions!.filter(option => option.toLowerCase().includes(filterValue));
      }
   
      
  }
}