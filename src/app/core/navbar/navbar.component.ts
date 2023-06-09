import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name:any;
  islogin!: boolean;
  constructor(public login:AuthService) { }


  ngOnInit(): void {
    this.name = localStorage.getItem("name");
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
