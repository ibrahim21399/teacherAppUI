import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {SelectButtonModule} from 'primeng/selectbutton';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';

// import { DialogModule } from 'primeng/dialog';
// import { ButtonModule } from 'primeng/button';



 


@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  exports:[
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent
  ],
  providers:[]
  

})
export class CoreModule { }
