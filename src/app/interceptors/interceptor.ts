import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, delay, catchError, throwError } from 'rxjs';
import { LoadingService } from '../sevices/loading.service';
import { UserModell } from '../models/UserModel';
import { LoginService } from '../sevices/login.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private loginService: LoginService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let jwt;

    this.loginService.getUserLogado().subscribe(
      res => jwt = res.accessToken
    )

    //MOSTRA O COMPONENTE LOADING ANTES DAS REQUISICOES
    this.loadingService.show()

    //FAZ O CLONE DO REQUEST E APLICA O TOKEN AO HEADER DA SOLICITAÇÃO
    const authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + jwt)
    });

    return next.handle(authReq).pipe(

      //catchError((error) => this.handleError(error))

      // DEPOIS DA REQUES FECHA O LOADING
       finalize(() => this.loadingService.hide())
    )
  }




  handleError(error: any) {

    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);

  }

}
