import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler,HttpRequest } from '@angular/common/http';
import { finalize,delay } from 'rxjs';
import { LoadingService } from '../sevices/loading.service';
import { UserModell } from '../models/UserModel';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let jwt ="";
    const storage = localStorage.getItem('userLogado');
    if(storage){
      const user:UserModell  = JSON.parse(storage)
      jwt = user.accessToken || ""
    }
    this.loadingService.show()
    // Clona a requisição porque não podemos alterar
    // a instância do HttpHeaders, ela é imutável
    const authReq = req.clone({
      headers: req.headers.set('Authorization',"Bearer "+ jwt)
    });
        return next.handle(authReq).pipe(
          finalize(() =>  this.loadingService.hide())
        )
    }






}
