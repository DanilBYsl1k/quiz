import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IBaseTest } from 'src/app/shared/interface/test.interface';
import { TestsService } from 'src/app/shared/services/tests.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  test: IBaseTest = this.activeRouter.snapshot.data['testResolve'];
  testPage: number;
  answers: (string | number)[] = [];

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private testService: TestsService
  ){}

  ngOnInit(): void {
    this.router.navigate([], { queryParams: { testPage: 0}});
    this.activeRouter.queryParamMap.subscribe(({ params }: Params) => {
      this.testPage = params.testPage as number;
    })
  }

  ngOnDestroy () {
    this.subscriptions.unsubscribe()
  }

  onSubmit(answer: string | number): void {
    const quantityTest = this.test.questions.length - 1;

    if(quantityTest+1 > +this.testPage){
      this.answers.push(answer);
    }

    if(quantityTest > this.testPage) {
      this.router.navigate([], { queryParams: { testPage: ++this.testPage } })
    } else {
      let result = { answer: this.answers, id: this.test._id}

      this.subscriptions.add(
        this.testService.testFinish(result).subscribe(()=> {
          this.router.navigate([`dashboard/test-result`, { testId: this.test._id }])
        })
      );
    }
  }
}
