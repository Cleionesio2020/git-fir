import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserModell } from '../models/UserModel';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseURL: string = 'http://localhost:8080/';
  private userLogado = new BehaviorSubject<UserModell>({})



  constructor(private http: HttpClient, private router: Router) {}
  headers = { 'content-type': 'application/json' };

  /** TENTA FAZER O LOGIN NO BAKEND */
  logar(userModel: UserModell): Observable<UserModell> {
    return this.http.post<UserModell>( `${this.baseURL}api/auth/signin`,  userModel, { headers: this.headers });
  }

  /**VERIFICA O RETORNO PARA VER SE O TOKEN ESTA VALIDO */
  verificaToken(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}api/test/user`);
  }

  getDecodedAccessToken(token: any): any {
    try {
      const tokenDecoded: any = jwt_decode(token);
      const expireDate = tokenDecoded.exp;
      return expireDate;
    } catch (Error) {
      return null;
    }
  }

  tokenExpirado(expireDate: any): boolean {
    if (expireDate < (new Date().getTime() + 1) / 1000) {
      return true;
    } else {
      return false;
    }
  }

  public getUserLogado():Observable<UserModell>{
    return this.userLogado.asObservable();
  }

  public setUserLogado(user:UserModell):void{
     this.userLogado.next(user)
  }
}
