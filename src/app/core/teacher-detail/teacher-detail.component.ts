import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route,Router  } from '@angular/router';
import { Teacher } from 'src/app/Model/Teacher';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { SweetalertService } from 'src/app/services/general/sweetalert.service';

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
  Role:any;

  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService
    ,private _sweetalertService: SweetalertService,
    ) { 
      this.loadTeacherDetails();
  @Output() ratingSubmitted = new EventEmitter<number>();

  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    this.loadTeacherDetails();
    console.log(this.IsEnrollerd);
    this.TeacherId=this.activateRoute.snapshot.params['id'];
this.StudentId = localStorage.getItem('userId');

  }

  loadTeacherDetails() {
    const id = this.activateRoute.snapshot.params['id'];
    this.teacherService.getTeacherById(id).subscribe(response => {
      if (response) {
        console.log(this.StudentId)
        console.log(this.TeacherId)
        console.log(response)
        this.teacher = response;
        this.teacher = this.teacher[0];
        console.log(this.teacher);
        if (Array.isArray(this.teacher.studentEnrolled)){
          for(var i=0;i < this.teacher.studentEnrolled.length ; i++)
            {
            if(this.teacher.studentEnrolled[i]._id == this.StudentId)this.IsEnrollerd = true;
           }
        }


      }
    }, error => {
      console.log(error);
    });
  }
  Enroll():void{
this.teacherService.Enroll(this.TeacherId,this.StudentId).subscribe(a=>{
  this.IsEnrollerd=true;
  console.log(a);
  this._sweetalertService.RunAlert(a.data.message,true);
},error=>{
  this._sweetalertService.RunAlert(error.error.message,false);

})
  }
  SendMessage(): void {
    this.router.navigate(['/messages', this.StudentId, this.TeacherId]);
  }

  RateTeacher(): void {
    this.router.navigate(['/RateTeacher', this.StudentId, this.TeacherId]);
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
    this.stars = this.stars.map((star, index) => index < rating ? 1 : 0);
  }

  submitRating(): void {
    if (this.selectedRating) {
      this.ratingSubmitted.emit(this.selectedRating);