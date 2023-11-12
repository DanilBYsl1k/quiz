import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent {
  result = this.activeRoute.snapshot.data['result']
  
  constructor(private activeRoute: ActivatedRoute) {}

}
