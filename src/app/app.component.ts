import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'employeeManagerFrontend';
  displayedColumns = ['firstName', 'lastName', 'department', 'action'];

  public employees?: Employee[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
    //this.dataSource = new MatTableDataSource<any>(this.employees);
  }

  ngOnInit() {
    return this.employeeService.getEmployees().subscribe(res => this.dataSource.data=res);
  }
  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }
      );
  }
  add(){
    this.dialog.open(AddComponent, {
        width: '30%',
        data:this.dataSource
    }
    )
  }

  viewdetails(employee: any){
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: employee
    });
  }

  public deleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        return this.employeeService.getEmployees().subscribe(res => this.dataSource.data=res)
      }
    );}

  edit(employee: any) {
    this.dialog.open(EditComponent, {
      width: '30%',
      data: {
        worker: employee,
        tableData: this.dataSource
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
