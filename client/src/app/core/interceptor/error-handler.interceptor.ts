import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor<T> implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      retry({
        count: 3, 
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),
      catchError(err => {
        return throwError(()=> {
          console.log('error http')
          return err
        })
      })
    );
  }
}
