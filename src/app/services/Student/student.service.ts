import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from 'src/app/Model/serviceResponse';
import { Student } from 'src/app/Model/Student';


const Url=environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _students=`${Url}students/`;
  private _Blockedstudents=`${Url}blockedstudents/`;
  private _changestdstatus=`${Url}changestdstatus/`;




  constructor(private http:HttpClient) { }
  StudentRegiser(student:Student):Observable<ServiceResponse<boolean>>{
    return this.http.post<ServiceResponse<boolean>>(`${this._students}`,student)
  }
  getActiveStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this._students}`);
  }

  getBlockedStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this._Blockedstudents}`);
  }

  changeStudentStatus(std:Student): Observable<Student> {
    return this.http.put<Student>(`${this._changestdstatus}`, std);

  }
}
