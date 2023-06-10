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
  teacher!: Teacher;

  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTeacherDetails();
  }

  loadTeacherDetails () {
    this.activateRoute.params.subscribe(a=> {
      this.teacherService.getTeacherById(a['id']).subscribe( teacher =>
        this.teacher = teacher.data
      )
    }, error => {
      console.log(error);

    });

}
}
