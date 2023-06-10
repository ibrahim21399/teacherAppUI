import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/teacherRegister/register.component';
import { LoginGuard } from '../app/services/login.guard';
import { HomeComponent } from './core/home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { StudentRegisterComponent } from './core/student-register/student-register.component';
import { FieldComponent } from './core/field/field.component';
import { ActiveStudentsComponent } from './core/active-students/active-students.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"TeacherRegister",component: RegisterComponent},
  {path:"StudentRegister",component: StudentRegisterComponent},
  // {path:"admin",component:AdminDashboardComponent,canActivate:[LoginGuard]},
  {path:"Fields",component: FieldComponent},
  {path:"students",component: ActiveStudentsComponent},

  {path:"error",component:ErrorComponent},
  {path:"",component:HomeComponent},

// { path: '**', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
