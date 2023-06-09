import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { SweetalertService } from 'src/app/services/general/sweetalert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  submitted: boolean = false;
  empType: string='Employee';
  isCompany: boolean = false;
  signupForm!: FormGroup;
  error: string = '';
  direction: string = '';
  constructor(
    private _teacherService: TeacherService,
    private _sweetalertService: SweetalertService,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.required],
      pricePerHour:['',Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      validator: this.MustMatch('password', 'confirmPassword'),
    });
  }

  ngOnInit(): void {}
  changeType() {
    if (this.empType == 'Employer') this.isCompany = true;
    else this.isCompany = false;
  }
  onSubmit() {
    console.log(this.signupForm.value);

    if (this.signupForm.invalid) {
      this._sweetalertService.RunAlert(
        'form not valid sholud check all inputs',
        false
      );
      return;
    }
    this.loading = true;
    this._teacherService.TeacherRegiser(this.signupForm.value).subscribe((res) => {
        this._sweetalertService.RunAlert(res.message, true);
    
    },(error)=>{

      this._sweetalertService.RunAlert(error.error.message, false);

    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get form() {
    return this.signupForm.controls;
  }
}
