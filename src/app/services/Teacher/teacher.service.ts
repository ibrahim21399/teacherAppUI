import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from 'src/app/Model/serviceResponse';
import { Teacher } from 'src/app/Model/Teacher';


const Url=environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private _Teachers=`${Url}teachers/`;
  private _HighstRate=`${Url}highrateteachers/`;
  private _apiGetAllNotAcceptedTeachers=`${Url}notactiveteachers`;
  private _apiChangeStatusTeacher=`${Url}changeteacherstatus`;




  constructor(private _httpClient:HttpClient) { }
  TeacherRegiser(teacher:Teacher):Observable<ServiceResponse<boolean>>{
    return this._httpClient.post<ServiceResponse<boolean>>(`${this._Teachers}`,teacher)
  }
  GetActiveTeachers():Observable<ServiceResponse<Teacher[]>>{
    return this._httpClient.get<ServiceResponse<Teacher[]>>(`${this._Teachers}`)
  }
  getTeachersWithHighestRate() {
    return this._httpClient.get<ServiceResponse<Teacher[]>>(`${this._HighstRate}`)
  }
  GetNotAceptedTeachers():Observable<ServiceResponse<Teacher[]>>{
    return this._httpClient.get<ServiceResponse<Teacher[]>>(`${this._apiGetAllNotAcceptedTeachers}`)
  }
  UpdateActivationOfTeacher(userId:string):Observable<ServiceResponse<boolean>>{
    return this._httpClient.put<ServiceResponse<boolean>>(`${this._apiChangeStatusTeacher}`,null)
  }
  DeleteTeacher(userId:string):Observable<ServiceResponse<boolean>>{
    return this._httpClient.delete<ServiceResponse<boolean>>(`${this._Teachers}/${userId}`)
  }
}
