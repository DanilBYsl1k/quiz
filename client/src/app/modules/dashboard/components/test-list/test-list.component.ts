import { Component } from '@angular/core';

import { TestsService } from 'src/app/shared/services/tests.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent {
  testList$ = this.testsService.testList();

  constructor(
    private testsService: TestsService
  ) {}

  selectedTest() {

  }
}
