import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TestsService } from 'src/app/shared/services/tests.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent {
  testList$ = this.testsService.testList();

  constructor(private testsService: TestsService, private router: Router) {}

  checkResult(testId: number) {
    this.router.navigate(['/dashboard/test-result', { testId:testId }])
  }
}
