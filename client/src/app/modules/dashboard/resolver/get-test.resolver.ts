import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import {Observable, catchError, of, map } from 'rxjs';
import { IBaseTest, ITest, ITestQuestion } from 'src/app/shared/interface/test.interface';
import { TestsService } from 'src/app/shared/services/tests.service';

@Injectable({
  providedIn: 'root'
})
export class GetTestResolver implements Resolve<Observable<ITest | HttpErrorResponse>> {
  constructor(private testsService: TestsService, private router: Router) {}

  shuffleArray(array: ITestQuestion[]): ITestQuestion[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IBaseTest | HttpErrorResponse> {
    return this.testsService.test(route.paramMap.get('id')!).pipe(
      map((testData) => {

        testData.questions = this.shuffleArray(testData.questions);
        return testData;
      }),
      catchError((error: HttpErrorResponse)=> {
        this.router.navigate(['/']);
        return of(error)
      })
    )
  }
}
// questions
