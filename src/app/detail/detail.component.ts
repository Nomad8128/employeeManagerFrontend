import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  projectForm !: FormGroup;
  pictureUrl !: string;
  ald !: number;
  vd !: number;
  pld !: number;


  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService, private dialogRef: MatDialogRef<DetailComponent>) {
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('30%', '80%');

    this.projectForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      picture: [''],
      gender: [''],
      year_of_birth: [''],
      work_start_date: [''],
      contract_type: [''],
      contract_length: [''],
      department: [''],
      annual_leave_days: [''],
      vacation_days: [''],
      paid_leave_days: ['']
    })
    if (this.data) {
      this.projectForm.controls['firstName'].setValue(this.data.firstName)
      this.projectForm.controls['lastName'].setValue(this.data.lastName);
      this.projectForm.controls['picture'].setValue(this.data.picture);
      this.pictureUrl = this.data.picture;
      this.projectForm.controls['gender'].setValue(this.data.gender);
      this.projectForm.controls['year_of_birth'].setValue(this.data.year_of_birth);
      this.projectForm.controls['work_start_date'].setValue(this.data.work_start_date);
      this.projectForm.controls['contract_type'].setValue(this.data.contract_type);
      this.projectForm.controls['contract_length'].setValue(this.data.contract_length);
      this.projectForm.controls['department'].setValue(this.data.department);
      if (this.data.annual_leave_days) {
        this.projectForm.controls['annual_leave_days'].setValue(this.data.annual_leave_days);
        this.ald = this.data.annual_leave_days;
      } else if (!this.data.annual_leave_days) {
        this.projectForm.controls['annual_leave_days'].setValue(" ");
        this.ald = this.data.annual_leave_days;
      }
      if (this.data.vacation_days) {
        this.projectForm.controls['vacation_days'].setValue(this.data.vacation_days);
        this.vd = this.data.vacation_days;
      } else if (!this.data.vacation_days) {
        this.projectForm.controls['vacation_days'].setValue(" ");
        this.vd = this.data.vacation_days;
      }
      if (this.data.paid_leave_days) {
        this.projectForm.controls['paid_leave_days'].setValue(this.data.paid_leave_days);
        this.pld = this.data.paid_leave_days;
      } else if (!this.data.paid_leave_days) {
        this.projectForm.controls['paid_leave_days'].setValue(" ");
        this.pld = this.data.paid_leave_days;
      }
     
    }

  }
}
