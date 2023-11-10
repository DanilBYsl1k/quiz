import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { testResultGuard } from './test-result.guard';

describe('testResultGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => testResultGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
