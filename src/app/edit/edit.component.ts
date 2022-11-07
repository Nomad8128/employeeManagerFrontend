import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  projectForm !: FormGroup;
  pictureUrl !: string;
  ald !: number;
  vd !: number;
  pld !: number;
  gender!:string;
  contract_type!:string;

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
    if (this.data) {
      this.projectForm.controls['firstName'].setValue(this.data.worker.firstName)
      this.projectForm.controls['lastName'].setValue(this.data.worker.lastName);
      this.projectForm.controls['picture'].setValue(this.data.worker.picture);
      this.pictureUrl = this.data.worker.picture;
      this.projectForm.controls['gender'].setValue(this.data.worker.gender);
      this.projectForm.controls['year_of_birth'].setValue(this.data.worker.year_of_birth);
      this.projectForm.controls['work_start_date'].setValue(this.data.worker.work_start_date);
      this.projectForm.controls['contract_type'].setValue(this.data.worker.contract_type);
      this.projectForm.controls['contract_length'].setValue(this.data.worker.contract_length);
      this.projectForm.controls['department'].setValue(this.data.worker.department);
      if (this.data.worker.annual_leave_days) {
        this.projectForm.controls['annual_leave_days'].setValue(this.data.worker.annual_leave_days);
        this.ald = this.data.worker.annual_leave_days;
      } else if (!this.data.worker.annual_leave_days) {
        this.projectForm.controls['annual_leave_days'].setValue("");
        this.ald = this.data.worker.annual_leave_days;
      }
      if (this.data.worker.vacation_days) {
        this.projectForm.controls['vacation_days'].setValue(this.data.worker.vacation_days);
        this.vd = this.data.worker.vacation_days;
      } else if (!this.data.worker.vacation_days) {
        this.projectForm.controls['vacation_days'].setValue("");
        this.vd = this.data.worker.vacation_days;
      }
      if (this.data.worker.paid_leave_days) {
        this.projectForm.controls['paid_leave_days'].setValue(this.data.worker.paid_leave_days);
        this.pld = this.data.worker.paid_leave_days;
      } else if (!this.data.worker.paid_leave_days) {
        this.projectForm.controls['paid_leave_days'].setValue("");
        this.pld = this.data.worker.paid_leave_days;
      }
    }
    this.gender=this.data.worker.gender
    this.contract_type=this.data.worker.contract_type
  }

  editEmployee() {
    //console.log(this.projectForm.controls['gender'].getRawValue());

    let updatedEmployee:Employee = {
      id: this.data.worker.id,
      firstName: this.projectForm.controls['firstName'].getRawValue(),
      lastName: this.projectForm.controls['lastName'].getRawValue(),
      picture: this.projectForm.controls['picture'].getRawValue(),
      gender: this.projectForm.controls['gender'].getRawValue(),
      year_of_birth: this.projectForm.controls['year_of_birth'].getRawValue(),
      work_start_date: this.projectForm.controls['work_start_date'].getRawValue(),
      contract_type: this.projectForm.controls['contract_type'].getRawValue(),
      contract_length: this.projectForm.controls['contract_length'].getRawValue(),
      department: this.projectForm.controls['department'].getRawValue(),
      annual_leave_days: this.projectForm.controls['annual_leave_days'].getRawValue(),
      vacation_days: this.projectForm.controls['vacation_days'].getRawValue(),
      paid_leave_days: this.projectForm.controls['paid_leave_days'].getRawValue()
    };

    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      (response: Employee) => {
        this.dialogRef.close();
        return this.employeeService.getEmployees().subscribe(res => this.data.tableData.data=res)
      }
    );
  }

}
