import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { Position } from 'src/app/Model/Position'
import { FieldService } from 'src/app/services/field.service';
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
  options: any[] = [];
  selectedOption: any;
  public lat:string = "0";
  public lng: string = "0";

  constructor(
    private _teacherService: TeacherService,
    private _sweetalertService: SweetalertService,
    private formBuilder: FormBuilder,
    private _fieldService: FieldService
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['', Validators.required],
      pricePerHour:['',Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      fieldId:[this.selectedOption],
      lat: [''],
      lng: [''],
      validator: this.MustMatch('password', 'confirmPassword'),
    });
  }

  ngOnInit(): void {
    this.getLocation();

    this._fieldService.getFields().subscribe(
      options => {
        console.log(options)
        this.options = options;

      },
      error => {
        console.log(error);
      }
    );
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

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude.toString();
          this.lng = position.coords.longitude.toString();
          console.log(this.lat);
          console.log(this.lng);
          this.signupForm.patchValue({
            Latitude: this.lat,
            Longitude: this.lng
          });
        }
      },
        (error) => {
          return console.log(error);
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  get form() {
    return this.signupForm.controls;
  }
}
