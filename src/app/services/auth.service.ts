import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from './general/sweetalert.service';
import jwtDecode from 'jwt-decode';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role?: string;
  isloggedin = false;
  email = "";
 decodedToken:any; 
 private IsLogin = new Subject<any>();

  url = "http://localhost:8080/api/";

  constructor(private http: HttpClient,private router:Router,private _sweetalertService: SweetalertService,
    ) {

   }

  Login(email: string, password: string) {
    this.http.post<any>(this.url + "login", { email: email, password: password }).subscribe( res => {
      console.log(res);
      localStorage.setItem("jwt_token", res.token)

      this.decodedToken = jwtDecode<any>(res.token);
      localStorage.setItem("name", this.decodedToken.name);

      this.email = email
      this.isloggedin = true;
      this.role= this.decodedToken.role;
      this.router.navigateByUrl("/")
    },error => {
      this._sweetalertService.RunAlert(error.error.message,false);
    })
  }
logout(){
  this.isloggedin = false;
  localStorage.clear();
  this.email =""
}
GetName():any{
return this.decodedToken.name;
}
GetRole():any{
  return this.decodedToken.role;
}
sendIsLogin(login:boolean = false){
  this.IsLogin.next(login)
}
getIsLogin(){
  return this.IsLogin.asObservable();
}

//  speakrOwnProfInof (){
//   return this.http.get<Speaker>(this.url+"Speaker/getownprofile")

//  }

//  speakrOwnProfEdit (speaker:Speaker){
//   return this.http.post(this.url+"Speaker/editownprofile",speaker)

//  }
}
