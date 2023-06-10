import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name:any;
  islogin: any;
  role: any;
  auth:boolean=false;
  constructor(public login:AuthService) { 
    if(localStorage.getItem("jwt_token")){
      this.login.isloggedin = true;
    }
    else{
      this.login.isloggedin = false;
    }
    this.role=localStorage.getItem("Role");
    this.name = localStorage.getItem("name");

  }


  ngOnInit(): void {
this.login.getIsLogin().subscribe(res=>{
  this.islogin = res;


});
  }
  logout(){
    this.login.logout();
    this.islogin =false;
    this.login.sendIsLogin(false);
    this.ngOnInit();

  }
}
