import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { message } from '../Model/message';
import { environment } from 'src/environments/environment';

const Url=environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _messages=`${Url}messages/`;

  constructor(private http: HttpClient) { }

  getMessages(student:string,teacher:string): Observable<message[]> {
    return this.http.get<message[]>(`${this._messages}${student}/${teacher}`);
  }

  sendMessage(msg: message): Observable<message> {
    return this.http.post<message>(this._messages, msg);
  }
}
