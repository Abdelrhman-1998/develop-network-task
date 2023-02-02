import { Component, OnInit,AfterViewInit,ViewChild,Input,OnChanges, SimpleChanges } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Employees} from '../models/employees.model';



@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit,AfterViewInit,OnChanges {

  constructor() { }
 
  ngOnChanges(changes: SimpleChanges): void {
   this.dataSource=new MatTableDataSource<Employees>(this.employees);
   this.dataSource.paginator = this.paginator;
 
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['Name','Employment Date','Salary','Experience','Department'];
  @Input()employees: Employees[] = [];
  dataSource = new MatTableDataSource<Employees>(this.employees);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {

  }


}
