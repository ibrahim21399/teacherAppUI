import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { admin } from 'src/app/Model/admin';
import { Student } from 'src/app/Model/Student';
import { Teacher } from 'src/app/Model/Teacher';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  public highestRatedTeachers!: any[];
  private userLatitude: number= 0 ;
  private userLongitude: number = 0 ;


  constructor(public auth:AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.getUserLocation();
    this.fetchHighestRatedTeachers();
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


  fetchHighestRatedTeachers() {
    this.http.get<any[]>('your-api-url/teachers/highest-rated')
      .subscribe(
        (teachers) => {
          this.highestRatedTeachers = teachers;
        },
        (error) => {
          console.error('Error fetching highest-rated teachers:', error);
        }
      );
  }
}
