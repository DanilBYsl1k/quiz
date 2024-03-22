import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, debounceTime, delay, of } from 'rxjs';
import { Router } from '@angular/router';

import { ITest, ITestResult, IBaseTest } from '../interface/test.interface';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  token: any = JSON.parse(localStorage.getItem('token')!) || null

  constructor(private http: HttpClient, private router: Router) { }

  testList(): Observable<ITest[]> {
    let { user } = this.token;
    return this.http.get<ITest[]>(`${environment.BASE_URL}testList/list/${user}`);
  };

  test(id: string): Observable<IBaseTest> {
    let { user } = this.token;
    return this.http.get<IBaseTest>(`${environment.BASE_URL}testList/test/${id}/${user}`);
  };

  testFinish(result: ITestResult): Observable<object | HttpErrorResponse> {
    return this.http.post(`${environment.BASE_URL}testList/finish`, { ...result, email: this.token.user }).pipe(
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
    return this.http.post(`${environment.BASE_URL}testList/result`, {id, email: this.token.user}).pipe();
  };
}

