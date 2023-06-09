import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token =  localStorage.getItem("jwt_token")
    if (token) {
      const newReq = request.clone({
        headers:request.headers.set("Authorization","Bearer "+ token)
      }) 
      return next.handle(newReq);
    }
    else{
      return next.handle(request);
    }
   
  }
}
