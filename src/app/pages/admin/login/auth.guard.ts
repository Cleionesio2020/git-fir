import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserModell } from 'src/app/models/UserModel';
import { LoginService } from '../../../sevices/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const storage = localStorage.getItem('userLogado');
    let tokenInfo = null
    let user!: UserModell
    //VERIFICA SO NO STORAGE TEM ALGUM USERLOGADO, SE HOUVER, SETA ELE NO SERVICE E
    //VERIFICA O TOKEN É VALIDO
    if (storage) {
      user = JSON.parse(storage)
      tokenInfo = this.loginService.getDecodedAccessToken(user.accessToken);
      if (!this.loginService.tokenExpirado(tokenInfo)) {
        this.loginService.setUserLogado(user)
        return true
      } else {
        localStorage.removeItem('userLogado')
        this.router.navigate(['login']);
        return false;
      }
    }else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
