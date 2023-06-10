import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/Model/Teacher';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent {
  teacher: Teacher |any;

  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTeacherDetails();
  }

  loadTeacherDetails() {
    const id = this.activateRoute.snapshot.params['id'];
    console.log(id)
    this.teacherService.getTeacherById(id).subscribe(response => {
      if (response) {
        this.teacher = response;
        console.log(this.teacher)
      }
    }, error => {
      console.log(error);
    });
  }
}
