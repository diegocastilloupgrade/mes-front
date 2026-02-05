import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  
  if (auth.rol() !== 'admin') {
    router.navigate(['/operario/dashboard']);
    return false;
  }

  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  if (auth.rol() !== 'admin') {
    router.navigate(['/operario/dashboard']);
    return false;
  }

  return true;
};

export const operarioGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  if (auth.rol() !== 'operario') {
    router.navigate(['/admin/dashboard']);
    return false;
  }

  return true;
};
