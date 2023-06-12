import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/Model/Teacher';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent {
  teacher: Teacher |any;
  TeacherId: string="";
    constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.loadTeacherDetails();
    }

    loadTeacherDetails() {
      const id = this.activateRoute.snapshot.params['id'];
      this.teacherService.getTeacherById(id).subscribe(response => {
        if (response) {
          this.teacher = response;
          this.teacher = this.teacher[0];
          this.TeacherId=id;
        }
      }, error => {
        console.log(error);
      });
    }
}
