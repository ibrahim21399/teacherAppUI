import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/Model/Teacher';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit{
  teacher: Teacher |any;
  studentId: string="";
  IsEnrollerd:boolean=false;

  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    this.loadTeacherDetails();
  }

  loadTeacherDetails() {
    const id = this.activateRoute.snapshot.params['id'];
    this.teacherService.getTeacherById(id).subscribe(response => {
      if (response) {
        this.teacher = response;
        this.teacher = this.teacher[0];
   
 

      }
    }, error => {
      console.log(error);
    });
  }
  Enroll():void{
let TeacherId=this.activateRoute.snapshot.params['id'];
const userId = localStorage.getItem('userId');
console.log(userId);
console.log(TeacherId);
  }
}
