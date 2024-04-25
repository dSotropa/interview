import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.$user.pipe(map((user: any) => {
    if (!user) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  }));
};
