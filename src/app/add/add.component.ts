import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  projectForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private dialogRef: MatDialogRef<DetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      picture: ['', Validators.required],
      gender: ['', Validators.required],
      year_of_birth: ['', Validators.required],
      work_start_date: ['', Validators.required],
      contract_type: ['', Validators.required],
      contract_length: ['', Validators.required],
      department: ['', Validators.required],
      annual_leave_days: [''],
      vacation_days: [''],
      paid_leave_days: ['']
    })
  }

  public addEmployee(){
    this.employeeService.addEmployee(this.projectForm.value).subscribe(
      (response: Employee) => {
        this.dialogRef.close();
        return this.employeeService.getEmployees().subscribe(res => this.data.data=res)
      }
    );
  }

}
