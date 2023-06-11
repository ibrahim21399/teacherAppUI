import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route,Router  } from '@angular/router';
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
  @Output() ratingSubmitted = new EventEmitter<number>();

  stars: number[] = [0, 0, 0, 0, 0];
  selectedRating: number=0;
  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadTeacherDetails();
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
        if (Array.isArray(this.teacher.studentEnrolled) && this.teacher.studentEnrolled.some((student: any) => student._id === this.StudentId)) {
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
    }
  }
}
