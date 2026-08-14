import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token';

export const adminGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isAdmin()) {

    return true;

  }

  router.navigate(['/books']);

  return false;

};