import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService = this.injector.get(ApiService);
    let tokenizeReq = request.clone({
      setHeaders:{
        Authorization: `Berrer ${authService.getItem()}`
      }
    })
    return next.handle(tokenizeReq);
  }
}
