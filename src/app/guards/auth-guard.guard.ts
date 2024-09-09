import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CheckLoginService } from '../service/check-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let checkLogin = inject(CheckLoginService);
  let router = inject(Router);
  let matSnackBar = inject(MatSnackBar)

  if (checkLogin.isLoggedIn()) {
    return true;
  }
  else {
    router.navigate(['login']);
    matSnackBar.open('Please login to see all movies', 'Close', { duration: 2000 });
    return false;
  }

};
