import { HttpClient } from '@angular/common/http';
import { Component,  OnChanges,  OnInit, SimpleChanges,  } from '@angular/core';
import { Field } from 'src/app/Model/Field';
import { Teacher } from 'src/app/Model/Teacher';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent  implements OnInit ,OnChanges {

  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];

  fields: Field[] = [];
  selectedField: any;
  searchText:string="";
  Rate:any;
  Years:any;

  constructor(public auth:AuthService, private http: HttpClient, private teacherService:TeacherService,private fieldService:FieldService) { }

 ngOnInit() {
   this.getAllTeachers();
   this.getFields();
 }
 ngOnChanges(): void {
 }
 getAllTeachers() {
  this.teacherService.GetActiveTeachers()
    .subscribe(response => {
    if (response) {
      console.log(response)
      this.teachers = response.data;
      this.filteredTeachers=response.data;
    }
  }, error => {
    console.log(error);

  });
}
getFields(): void {
  this.fieldService.getFields()
    .subscribe(  (fields: Field[])=>{
      this.fields=fields;
    });
}

filterTeachers() {
  this.filteredTeachers = this.teachers;
  if (this.searchText) {
    console.log("1");

    this.filteredTeachers = this.filteredTeachers.filter(teacher => teacher.name.toLowerCase().includes(this.searchText.toLowerCase()));
    console.log(this.filteredTeachers);
  }
  if (this.selectedField) {
    console.log(this.selectedField);


    this.filteredTeachers = this.filteredTeachers.filter(teacher => teacher.FieldId._id === this.selectedField);
  }
  if(this.Rate){
    this.filteredTeachers = this.filteredTeachers.filter(teacher => teacher.rating === this.Rate);

  }
  if(this.Years){
    this.filteredTeachers = this.filteredTeachers.filter(teacher => teacher.experience === this.Years);

  }

  return this.filteredTeachers;
}




}
