import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const productsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Si el token existe, permitir el acceso
    return true;
  } else {
    // Si no hay token, redirigir al login
    router.navigate(['/login']);
    return false;
  }
};
