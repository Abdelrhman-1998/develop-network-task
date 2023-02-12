
import { OnDestroy,ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges,OnChanges, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription } from 'rxjs';
import {JsonFormData} from '../models/form.model';
import { formService} from '../services/formService';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers:[formService]
})
export class JsonFormComponent implements OnInit,OnChanges,OnDestroy {
  constructor(private fb:FormBuilder,private formService:formService ) {

   }
  // form properities
    formIcons:{[key:string]:string}={passwordIcon:'visibility_off'}; // angular material icon
    checkBoxGroups:any={};
    myForm: FormGroup= this.fb.group({});;
    
    subscriptions:Subscription[]=[];
    selectSearch:{[contorlName:string]:string[]}={};
  // -------------------
    @Input()jsonFormData!:JsonFormData;
    @Input()onSubmit?:Function
    @Input()onReset?:Function;
    @Input()formClass?:String;
    @Input()asynchSelectSearch!:{[key:string]:string[]};
    @Input()formId!:string;
  
  

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
        ( {form:this.myForm,subscriptions:this.subscriptions,checkBoxGroups:this.checkBoxGroups,selectSearch:this.selectSearch} = this.formService.createForm(this.jsonFormData.controls) )
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((ele)=>{
      ele?.unsubscribe();
    })
  }
  togglePassword(ele:HTMLInputElement){
    
    if(ele.type==='password'){
      ele.type='text';
      this.formIcons['passwordIcon']='visibility_on';
    }else{
      ele.type='password';
      this.formIcons['passwordIcon']='visibility_off';
    }

  }
}
