import { HttpClient } from '@angular/common/http';
import { Component,  OnInit,  } from '@angular/core';
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
export class TeachersListComponent  implements OnInit {

  teachers: Teacher[] = [];
  fields: Field[] = [];
  selectedField: any
  searchText:string="";
  currentPage:number = 1;
  itemsPerPage:number = 6;

  constructor(public auth:AuthService, private http: HttpClient, private teacherService:TeacherService,private fieldService:FieldService) { }

 ngOnInit() {
   this.getAllTeachers();
   this.getFields();
 }
 getAllTeachers() {
  this.teacherService.GetActiveTeachers()
    .subscribe(response => {
    if (response) {
      console.log(response)
      this.teachers = response.data;
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
  let filteredTeachers = this.teachers;
  if (this.searchText) {
    filteredTeachers = filteredTeachers.filter(teacher => teacher.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  if (this.selectedField) {
    filteredTeachers = filteredTeachers.filter(teacher => teacher.FieldId === this.selectedField);
  }
  return filteredTeachers;
}
getTotalPages() {
  return Math.ceil(this.teachers.length / this.itemsPerPage);
}
getPages() {
  const totalPages = this.getTotalPages();
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
}


}
