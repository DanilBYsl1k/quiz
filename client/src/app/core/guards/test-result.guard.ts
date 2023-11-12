import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestResultGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { testId } = route.params;
    console.log(testId)
    if (!testId) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}