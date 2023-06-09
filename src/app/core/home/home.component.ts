import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { admin } from 'src/app/Model/admin';
import { Student } from 'src/app/Model/Student';
import { Teacher } from 'src/app/Model/Teacher';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  highestRatedTeachers: Teacher[] = [];
  private userLatitude: number= 0 ;
  private userLongitude: number = 0 ;


  constructor(public auth:AuthService, private http: HttpClient, private teacherService:TeachersService) { }

  ngOnInit() {
    this.getUserLocation();
    this.getTeachersNearStudentWithHighstRate();
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
    const mapElement = document.getElementById('map');

    if (mapElement) {
      const map = L.map(mapElement).setView([this.userLatitude, this.userLongitude], 10);

      // Add the tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      // Place a marker at the user's location
      const userMarker =  L.marker([this.userLatitude, this.userLongitude]).addTo(map);
      userMarker.bindPopup('Your Location').openPopup();
    }
  }


  getTeachersNearStudentWithHighstRate() {
    this.teacherService.getTeachersWithHighestRate()
      .subscribe(response => {
      if (response) {
        this.highestRatedTeachers = response;

      }
    }, error => {
      console.log(error);

    });
  }
}
