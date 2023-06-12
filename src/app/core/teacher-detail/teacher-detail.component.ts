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
  starWidth: number = 0;

  @Output() ratingSubmitted = new EventEmitter<number>();

  stars: number[] = [0, 0, 0, 0, 0];
  selectedRating: number=0;
  constructor(private teacherService:TeacherService,  private activateRoute:ActivatedRoute,private authService:AuthService,
    private _sweetalertService: SweetalertService,private router: Router) { 
      this.loadTeacherDetails();
      this.TeacherId=this.activateRoute.snapshot.params['id'];
      this.StudentId = localStorage.getItem('userId');
      this.Role = localStorage.getItem('Role');
    }

  ngOnInit(): void {
    this.loadTeacherDetails();
    this.TeacherId=this.activateRoute.snapshot.params['id'];
    this.StudentId = localStorage.getItem('userId');
    this.Role = localStorage.getItem('Role');

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
    this.teacherService.Enroll(this.TeacherId,this.StudentId).subscribe(a=>{
      this.IsEnrollerd=true;
      console.log(a);
      this._sweetalertService.RunAlert(a.data.message,true);
    },error=>{
      this._sweetalertService.RunAlert(error.error.message,false);
    
    });
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

  rateProduct(rateValue: number) {
    console.log(rateValue);
    this.starWidth = rateValue * 75 / 5;
  }
}
