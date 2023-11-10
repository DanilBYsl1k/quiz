import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getTestResolver } from './get-test.resolver';

describe('getTestResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getTestResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
