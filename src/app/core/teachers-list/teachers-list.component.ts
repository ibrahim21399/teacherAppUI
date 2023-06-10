import { HttpClient } from '@angular/common/http';
import { Component,  OnInit,  } from '@angular/core';
import { Teacher } from 'src/app/Model/Teacher';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent  implements OnInit {
  
  teachers: Teacher[] = [];

  constructor(public auth:AuthService, private http: HttpClient, private teacherService:TeacherService) { }

 ngOnInit() {
   this.getAllTeachers();
 }
 getAllTeachers() {
  this.teacherService.GetActiveTeachers()
    .subscribe(response => {
    if (response) {
      this.teachers = response.data;

    }
  }, error => {
    console.log(error);

  });
}
}
