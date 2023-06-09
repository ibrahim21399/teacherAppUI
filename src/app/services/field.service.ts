import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../Model/Field';
import { environment } from 'src/environments/environment';

const Url=environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private _fields=`${Url}fields/`;



  constructor(private http: HttpClient) { }

  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(`${this._fields}`);
  }

  getField(id: string): Observable<Field> {
    const url = `${this._fields}/${id}`;
    return this.http.get<Field>(url);
  }

  addField(field: Field): Observable<Field> {
    return this.http.post<Field>(this._fields, field);
  }

  updateField(field: Field): Observable<Field> {
    return this.http.put<Field>(`${this._fields}${field._id}`, field);
  }

  deleteField(id: string): Observable<Field> {
    return this.http.delete<Field>(`${this._fields}${id}`);
  }


}
