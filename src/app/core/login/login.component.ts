import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:string = "";
password:string = "";
message = "";
pass = "password";
fa = "fa-eye";

  constructor(private auth:AuthService, ) { }

  ngOnInit(): void {
  }
login(){
  this.auth.Login(this.username,this.password);


}
}
