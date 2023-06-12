import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { admin } from '../../Model/admin';
import { environment } from 'src/environments/environment';

const Url=environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class adminService {

  private _admin=`${Url}admins/`;



  constructor(private http: HttpClient) { }

  getAdminss(): Observable<admin[]> {
    return this.http.get<admin[]>(`${this._admin}`);
  }

  getAdmin(id: string): Observable<admin> {
    const url = `${this._admin}/${id}`;
    return this.http.get<admin>(url);
  }

  addAdmin(admin: admin): Observable<admin> {
    return this.http.post<admin>(this._admin, admin);
  }

  updateField(admin: admin): Observable<admin> {
    return this.http.put<admin>(`${this._admin}${admin._id}`, admin);
  }

  deleteField(id: string): Observable<admin> {
    return this.http.delete<admin>(`${this._admin}${id}`);
  }


}
