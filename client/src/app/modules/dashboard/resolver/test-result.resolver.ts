import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ITest } from 'src/app/shared/interface/test.interface';
import { TestsService } from 'src/app/shared/services/tests.service';

@Injectable({
  providedIn: 'root'
})
export class TestResultResolver implements Resolve<Observable<object | HttpErrorResponse>> {
  constructor(private testsService: TestsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): any {
    let testId = route.paramMap.get('testId');
    if(testId) {
      return this.testsService.testResult(testId).pipe(
        catchError((error: HttpErrorResponse)=> {
          this.router.navigate(['/']);
          return of(error)
        })
      )
    } 
    this.router.navigate(['/']);
  }
}
