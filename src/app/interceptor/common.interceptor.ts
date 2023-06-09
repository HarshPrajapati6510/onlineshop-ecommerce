import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsService } from '../shared/services/products.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {


  constructor(private productsService:ProductsService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token:any;
    if(this.productsService.getlocalStorage('login')){
       token=this.productsService.getlocalStorage('login')
    }
    if (token) {
      request=request.clone({ setHeaders: { 'token': token } });
      // let decodeToken:any=jwt_decode(token)
      // console.log('decode token==>',decodeToken.exp);
      // let time=Math.floor((new Date).getTime() / 1000)>=decodeToken.exp
      // console.log('time expire==>',time,Math.floor((new Date).getTime() / 1000-decodeToken.exp));
      
      // if (time) {
      //   this.regenerate()
      // }
     
    }
    return next.handle(request);
  }
  regenerate(){
    this.productsService.regenerateToken().subscribe({
      next:(res:any)=>{
        console.log('regenerate token successfully===>',res);
        this.productsService.setLocalStorage('login',res.data.token)
      }
    })
  }
}
