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
  TeacherId: string="";
  StudentId: string|any;
  IsEnrollerd:boolean=false;

  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    this.loadTeacherDetails();
    this.TeacherId=this.activateRoute.snapshot.params['id'];
this.StudentId = localStorage.getItem('userId');

  }

  loadTeacherDetails() {
    const id = this.activateRoute.snapshot.params['id'];
    this.teacherService.getTeacherById(id).subscribe(response => {
      if (response) {
        this.teacher = response;
        this.teacher = this.teacher[0];
        if (Array.isArray(this.teacher.studentEnrolled) && this.teacher.studentEnrolled.includes(this.StudentId)) {
          this.IsEnrollerd = true;
        }      

      }
    }, error => {
      console.log(error);
    });
  }
  Enroll():void{
this.teacherService.Enroll(this.TeacherId,this.StudentId).subscribe(a=>{this.IsEnrollerd=true})
  }
  SendMessage():void{
    
  }
}
