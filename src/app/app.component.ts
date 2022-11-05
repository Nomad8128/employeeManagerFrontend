import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetailComponent } from './detail/detail.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'employeeManagerFrontend';
  displayedColumns = ['first_name', 'last_name', 'department', 'action'];

  public employees?: Employee[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;



  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>(this.employees);
}

  ngOnInit() {
    return this.employeeService.getEmployees().subscribe(res => this.dataSource.data=res)
  }
  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator=this.paginator;
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }
      );
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

}
