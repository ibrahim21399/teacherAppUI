import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name:any;
  Id:any;
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
    this.name = localStorage.getItem("name");
    this.role=localStorage.getItem("Role");
    this.Id = localStorage.getItem("Id");

  }


  ngOnInit(): void {
    this.name = localStorage.getItem("name");
this.login.getname().subscribe(res=>{
  this.name =res;
})
  this.login.getIsLogin().subscribe(res=>{
  this.islogin = res;


});
this.login.getRole().subscribe(res=>{
  this.role = res;


});
  }
  logout(){
    this.login.logout();
    this.islogin =false;
    this.login.sendIsLogin(false);
    this.login.sendRole('');
    this.ngOnInit();

  }
}
