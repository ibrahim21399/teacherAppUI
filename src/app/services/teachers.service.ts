import { Injectable } from '@angular/core';
import { IPagination } from '../Model/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TeacherParams } from '../Model/teacherParams';
import { Teacher } from '../Model/Teacher';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  baseUrl = 'https://localhost:8080/api/';
  constructor(private http:HttpClient) { }

  getProducts(teacherParams :TeacherParams) {

    let params = new HttpParams();

    if (teacherParams.price !== 0) {
      params = params.append("price", teacherParams.price.toString());
    }
    if (teacherParams.hours !== 0) {
      params = params.append("hours", teacherParams.hours.toString());
    }
    if (teacherParams.experience !== 0) {
      params = params.append("experience", teacherParams.experience.toString());
    }
    if (teacherParams.rating !== 0) {
      params = params.append("rating", teacherParams.rating.toString());
    }

    if (teacherParams.search) {
      params = params.append("search", teacherParams.search)
    }

    params = params.append("sort", teacherParams.sort)

    params = params.append('pageIndex', teacherParams.pageNumber.toString());
    params = params.append('pageSize', teacherParams.pageSize.toString());

    //observing response ==> give us http reponse instead of the body of the response ==> {observe: 'response', params}
    return this.http.get<IPagination>(this.baseUrl + 'teachers', {observe: 'response', params})
      .pipe(

        map(response => {
          return response.body;
        })
      )

  }


  getProduct(id: number) {
    return this.http.get<Teacher>(this.baseUrl + 'products/' + id);
  }
  // getFields() {
  //   // return  the body of the response
  //   return this.http.get<IBrand[]>(this.baseUrl + 'Products/brands');
  // }

}

