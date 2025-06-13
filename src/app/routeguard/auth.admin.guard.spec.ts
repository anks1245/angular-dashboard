import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authAdminGuard } from './auth.admin.guard';

describe('authAdminGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
