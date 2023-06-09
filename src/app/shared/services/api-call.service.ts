import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }
  getApi(url:any,params:any){
    return this.http.get(url,params)
  }
  postApi(url:any,body:any){
    return this.http.post(url,body)
  }
  delete(url:any){
    this.http.delete(url)
  }
}
