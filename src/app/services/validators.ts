import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IsEmail, validate} from "class-validator";
interface Form{
    [key:string]:any
}
@Injectable()
export class formValidators implements Form {
    @IsEmail(undefined,{message:'Not a valid email'})
    email!:string;
 
    async validate(formInstance:formValidators,formGroup:FormGroup) {
    
        validate(formInstance).then((res)=>{
                res.forEach((ele)=>{
                    let errors:any=formGroup.get(ele.property)?.errors;
                    if(!errors){
                        errors={};
                    }

                    errors[ele.property]=ele.constraints;
                    formGroup.get(ele.property)?.setErrors(errors);
                    console.log(errors)
                })
        })
    }


}