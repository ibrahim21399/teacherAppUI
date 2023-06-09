import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { admin } from 'src/app/Model/admin';
import { Student } from 'src/app/Model/Student';
import { Teacher } from 'src/app/Model/Teacher';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
 teacher!:Teacher;
 student!:Student;


  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    if (this.auth.role=="speaker") {

      
    }
  }

  editSpeaker(){
  }
  hideDialog() {

}
postEditedSpeaker(){

}
}
