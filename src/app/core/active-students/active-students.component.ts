import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/Model/Student';
import { StudentService } from 'src/app/services/Student/student.service';

@Component({
  selector: 'app-active-students',
  templateUrl: './active-students.component.html',
  styleUrls: ['./active-students.component.css']
})
export class ActiveStudentsComponent implements OnInit {
  students: Student[]=[];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllActive();
  }

  getAllActive(): void {
    this.studentService.getActiveStudents()
      .subscribe(students => this.students = students);
  }




}


