import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ITest } from 'src/app/shared/interface/test.interface';
import { TestsService } from 'src/app/shared/services/tests.service';

@Injectable({
  providedIn: 'root'
})
export class GetTestResolver implements Resolve<Observable<ITest | HttpErrorResponse>> {
  constructor(private testsService: TestsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITest | HttpErrorResponse> {
    return this.testsService.test(route.paramMap.get('id')!).pipe(

      catchError((error: HttpErrorResponse)=> {
        this.router.navigate(['/']);
        return of(error)
      })
    )
  }
}
