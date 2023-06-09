import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/Student/student.service';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { SweetalertService } from 'src/app/services/general/sweetalert.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  loading: boolean = false;
  submitted: boolean = false;
  signupForm!: FormGroup;
  error: string = '';
  direction: string = '';
  constructor(
    private _StudentService: StudentService,
    private _sweetalertService: SweetalertService,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      validator: this.MustMatch('password', 'confirmPassword'),
    });
  }

  ngOnInit(): void {}
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
    this._StudentService.StudentRegiser(this.signupForm.value).subscribe((res) => {
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
