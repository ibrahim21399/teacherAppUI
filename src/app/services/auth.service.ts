import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from './general/sweetalert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role?: string;
  isloggedin = false;
  email = "";
  url = "http://localhost:8080/api/";

  constructor(private http: HttpClient,private router:Router,private _sweetalertService: SweetalertService,
    ) {

   }

  Login(email: string, password: string) {
    this.http.post<any>(this.url + "login", { email: email, password: password }).subscribe( res => {
      console.log(res);
      localStorage.setItem("jwt_token", res.token)
      this.email = email
      this.isloggedin = true;
      this.router.navigateByUrl("/")
      this.role= res.role;
    },error => {
      this._sweetalertService.RunAlert(error.error.message,false);
    })
  }
logout(){
  this.isloggedin = false;
  localStorage.removeItem("jwt_token")
  this.email =""
}
//  speakrOwnProfInof (){
//   return this.http.get<Speaker>(this.url+"Speaker/getownprofile")
  
//  }

//  speakrOwnProfEdit (speaker:Speaker){
//   return this.http.post(this.url+"Speaker/editownprofile",speaker)
  
//  }
}
