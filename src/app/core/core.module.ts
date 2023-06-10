import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {SelectButtonModule} from 'primeng/selectbutton';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './teacherRegister/register.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { FieldComponent } from './field/field.component';
import { ActiveStudentsComponent } from './active-students/active-students.component';
import { PendingTeachersComponent } from './pending-teachers/pending-teachers.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReviewComponent } from './home/review/review.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';







@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    ErrorComponent,
    StudentRegisterComponent,
    FieldComponent,
    ActiveStudentsComponent,
    PendingTeachersComponent,
    ReviewComponent,
    TeacherDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports:[
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
  ],
  providers:[]


})
export class CoreModule { }
