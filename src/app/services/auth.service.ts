import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role?: string;
  isloggedin = false;
  email = "";
  url = "http://localhost:8080/api/";

  constructor(private http: HttpClient,private router:Router) {

   }

  Login(email: string, password: string) {
    console.log(email);
    this.http.post<any>(this.url + "login", { email: email, password: password }).subscribe(res => {
      localStorage.setItem("jwt_token", res.token)
      this.email = email
      this.isloggedin = true;
      this.router.navigateByUrl("/")
      this.role= res.role;
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
