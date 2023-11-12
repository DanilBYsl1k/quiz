import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, debounceTime, delay, of, takeUntil } from 'rxjs';

import { ITest, testResult } from '../interface/test.interface';
import { environment } from 'src/environment/environment.dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  token: any = JSON.parse(localStorage.getItem('token')!) || null
 
  constructor(private http: HttpClient, private router: Router) { }

  testList(): Observable<ITest[]> {
    let { user } = this.token;
    return this.http.get<ITest[]>(`${environment.BASE_URL}test/list/${user}`);
  };

  test(id: string): Observable<ITest> {
    return this.http.get<ITest>(`${environment.BASE_URL}test/test/${id}`);
  };

  testFinish(result: testResult): Observable<object | HttpErrorResponse> {
    return this.http.post(`${environment.BASE_URL}test/finish`, { ...result, email: this.token.user }).pipe(
      debounceTime(2000),
      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error);
        this.router.navigate(['/']);
        return of(error);
      }),
      delay(100)
    );
  };

  testResult(id: string) {
    return this.http.post(`${environment.BASE_URL}test/result`, {id, email: this.token.user}).pipe(); 
  };
}

