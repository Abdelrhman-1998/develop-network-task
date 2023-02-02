import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Employees } from '../models/employees.model';
import { EmployeeService } from './employee.service';
@Injectable({
  providedIn: 'root'
})
export class FilterPanelService {

  constructor(private employeesService:EmployeeService,private datePipe: DatePipe) { }
  filterData(Employees:Employees[],formData:any[]){
    let filteredEmployees= Employees.filter((ele,index)=>{
     
          return (
            (formData[0]?formData[0]===ele.first_name+" "+ele.last_name:true) &&
            (formData[1]?this.datePipe.transform(new Date(formData[1]),'yyyy-MM-dd')===ele.employment_Date:true) &&
            (formData[2]?formData[2]===ele.department:true) &&
            (formData[3]?+formData[3]===ele.salary:true) &&
            (formData[4].length?formData[4].includes(ele.experience):true)
          )
      })
      this.employeesService.currentEmployees.next(filteredEmployees);
      
      return filteredEmployees
  }
}
