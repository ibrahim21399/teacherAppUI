import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Model/Student';
import { StudentService } from 'src/app/services/Student/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  student: Student |any;
    constructor(private StudentService:StudentService,  private activateRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.loadTeacherDetails();
    }

    loadTeacherDetails() {
      const id = this.activateRoute.snapshot.params['id'];
      this.StudentService.getStudentById(id).subscribe(response => {
        if (response) {
          this.student = response;
          this.student = this.student[0];


        }
      }, error => {
        console.log(error);
      });
    }
}
