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
  private _student=`${Url}students/`;




  constructor(private _httpClient:HttpClient) { }
  StudentRegiser(student:Student):Observable<ServiceResponse<boolean>>{
    return this._httpClient.post<ServiceResponse<boolean>>(`${this._student}`,student)
  }
  
}
