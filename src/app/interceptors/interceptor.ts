import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler,HttpRequest } from '@angular/common/http';
import { finalize,delay } from 'rxjs';
import { LoadingService } from '../sevices/loading.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
 
  constructor(private loadingService:LoadingService){}
   
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const jwt = localStorage.getItem("accessToken") || ""
    this.loadingService.show()
    // Clona a requisição porque não podemos alterar
    // a instância do HttpHeaders, ela é imutável
    const authReq = req.clone({
      headers: req.headers.set('Authorization',"Bearer "+ jwt)
    });
        return next.handle(authReq).pipe(
           delay(5000),
          finalize(() =>  this.loadingService.hide())
        )
    }

    




}
