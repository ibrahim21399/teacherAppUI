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
import { PendingTeachersComponent } from './core/pending-teachers/pending-teachers.component';
import { TeachersListComponent } from './core/teachers-list/teachers-list.component';
import { TeacherDetailComponent } from './core/teacher-detail/teacher-detail.component';
import { TeacherProfileComponent } from './core/teacher-profile/teacher-profile.component';
import { MessageComponent } from './core/messages/messages.component';
import { AdminComponent } from './core/admin/admin/admin.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"TeacherRegister",component: RegisterComponent},
  {path:"StudentRegister",component: StudentRegisterComponent},
  // {path:"admin",component:AdminDashboardComponent,canActivate:[LoginGuard]},
  {path:"Fields",component: FieldComponent},
  {path:"students",component: ActiveStudentsComponent},
  {path:"PendingTeachers",component: PendingTeachersComponent},
  {path:"TeachersList",component: TeachersListComponent},
  {path:"Admins",component: AdminComponent},

  {path: "teacherDetail/:id", component: TeacherDetailComponent},
  {path: "teacherProfile/:id", component: TeacherProfileComponent},
  { path: 'messages/:studentId/:teacherId', component: MessageComponent },
  {path:"error",component:ErrorComponent},
  {path:"",component:HomeComponent},

// { path: '**', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
