import { Component ,OnDestroy,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Employees } from './models/employees.model';
import { EmployeeService } from './services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy,OnInit {
  title = 'Develop_Network';
  currentEmployees:Employees[]=[];
  observables:Subscription[]=[];

  constructor(private employeeService:EmployeeService,private router:Router){
    let observer1=  this.employeeService.getAllEmployees().subscribe((res)=>{
        this.currentEmployees=res;
        this.employeeService.allEmployees.next(res);
        this.employeeService.currentEmployees.next(res);
       
    })
    let observer2=  this.employeeService.currentEmployees.subscribe((res)=>{
      this.currentEmployees=res;
     
  })
    this.observables.push(observer1,observer2)
  }
  ngOnInit(): void {
   this.router.navigate(['home']);
   
  }
  ngOnDestroy(): void {
    this.observables.forEach((ele)=>{
      ele?.unsubscribe();
    })
  }
}
