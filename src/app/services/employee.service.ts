import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employees } from '../models/employees.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { 

  }
  allEmployees:Subject<Employees[]> = new Subject();
  currentEmployees:Subject<Employees[]> = new Subject();

  getAllEmployees(){
    
   return this.http.get<Employees[]>('https://developnetwork-d0131-default-rtdb.firebaseio.com/employees.json')
  }
}
