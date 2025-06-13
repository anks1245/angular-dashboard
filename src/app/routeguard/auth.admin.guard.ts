import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');

  return isLoggedIn ? true : router.parseUrl('/');
};
