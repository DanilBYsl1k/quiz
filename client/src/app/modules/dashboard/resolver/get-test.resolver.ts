import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import {Observable, catchError, of, mergeMap, switchMap } from 'rxjs';
import { ITest } from 'src/app/shared/interface/test.interface';
import { TestsService } from 'src/app/shared/services/tests.service';

@Injectable({
  providedIn: 'root'
})
export class GetTestResolver implements Resolve<Observable<ITest | HttpErrorResponse>> {
  constructor(private testsService: TestsService, private router: Router) {}

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ITest | HttpErrorResponse> {
    return this.testsService.test(route.paramMap.get('id')!).pipe(
      switchMap((testData: any) => {
        // Перемешиваем массив вопросов
        testData.questions = this.shuffleArray(testData.questions);
        return of(testData);
      }),
      catchError((error: HttpErrorResponse)=> {
        this.router.navigate(['/']);
        return of(error)
      })
    )
  }
}
// questions
