import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { admin } from 'src/app/Model/admin';
import { Student } from 'src/app/Model/Student';
import { Teacher } from 'src/app/Model/Teacher';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  highestRatedTeachers: Teacher[] = [];
  teachers: Teacher[] = [];
  private userLatitude: number= 0 ;
  private userLongitude: number = 0 ;
  map: any;
  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  public ratingArr = [];

  constructor(public auth:AuthService, private http: HttpClient, private teacherService:TeacherService,
     private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserLocation();
    // this.getTeachers();
    this.getActivatedTeachers();
     this.getTeachersWithHighstRate();
  }
  onClick(rating:number) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.initializeMap();
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }

  initializeMap() {
    this.map = L.map('map').setView([this.userLatitude, this.userLongitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    // Place a marker at the user's location
    L.marker([this.userLatitude, this.userLongitude])
      .addTo(this.map)
      .bindPopup('Your Location');

    // Place markers for nearby teachers
    this.teachers.forEach((teacher) => {
      L.marker([teacher.Latitude, teacher.Longitude])
        .addTo(this.map)
        .bindPopup(`<strong>${teacher.name}</strong><br>Rating: ${teacher.rating}`);
    });
  }


  getTeachersWithHighstRate() {
    // this.teacherService.getTeachersWithHighestRate()
    //   .subscribe(response => {
    //   if (response) {
    //     this.highestRatedTeachers = response.data;

    //   }
    // }, error => {
    //   console.log(error);

    // });

    //For Teest Without APIs
    this.highestRatedTeachers = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        phone: '1234567890',
        pricePerHour: 20,
        experience: 5,
        Latitude: 51.5074,
        Longitude: -0.1278,
        FieldId: '1',
        pictureUrl:"",
        rating: 4.5,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      },
      {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        phone: '0987654321',
        pricePerHour: 25,
        experience: 3,
        Latitude: 51.5072,
        Longitude: -0.1279,
        FieldId: '2',
        pictureUrl:"",
        rating: 4.2,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      },
      {
        _id: '20',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        phone: '0987654321',
        pricePerHour: 25,
        experience: 3,
        Latitude: 51.5072,
        Longitude: -0.1279,
        FieldId: '2',
        pictureUrl:"",
        rating: 4.2,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      },
      {
        _id: '15',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        phone: '0987654321',
        pricePerHour: 25,
        experience: 3,
        Latitude: 51.5072,
        Longitude: -0.1279,
        FieldId: '2',
        pictureUrl:"",
        rating: 4.2,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      },
      {
        _id: '11',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        phone: '0987654321',
        pricePerHour: 25,
        experience: 3,
        Latitude: 51.5072,
        Longitude: -0.1279,
        FieldId: '2',
        pictureUrl:"",
        rating: 4.2,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      },
      {
        _id: '7',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        phone: '0987654321',
        pricePerHour: 25,
        experience: 3,
        Latitude: 51.5072,
        Longitude: -0.1279,
        FieldId: '2',
        pictureUrl:"",
        rating: 4.2,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      },
      {
        _id: '10',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
        phone: '0987654321',
        pricePerHour: 25,
        experience: 3,
        Latitude: 51.5072,
        Longitude: -0.1279,
        FieldId: '2',
        pictureUrl:"",
        rating: 4.2,
        registerationDate: new Date(),
        Active: true,
        AcceptanceDate: new Date()
      }
      ];
  }

  getActivatedTeachers() {
    this.teacherService.GetActiveTeachers()
      .subscribe(response => {
      if (response) {
        this.teachers = response.data;

      }
    }, error => {
      console.log(error);

    });
  }


}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
