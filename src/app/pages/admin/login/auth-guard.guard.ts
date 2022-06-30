import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/sevices/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('accessToken');

    const tokenInfo = this.loginService.getDecodedAccessToken(token);

    if (token && !this.loginService.tokenExpirado(tokenInfo)) {

      return true;
    } else {
      console.log(`>>>>>>>This toke is expired in
       ${new Date(tokenInfo*1000).toLocaleString()} <<<<<<<<`)
      this.router.navigate(['login']);
      return false;
    }
  }
}
