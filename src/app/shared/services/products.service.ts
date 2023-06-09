import { Injectable, OnInit } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  cartCount = new BehaviorSubject<any>(false);
  currency = new BehaviorSubject<any>(false);
  isLikedProduct = new BehaviorSubject<any>(false);
  isLogin = new BehaviorSubject<any>(false);
  breadCrumb = new BehaviorSubject<any>([
    {
      label: 'Home',
      path: '',
    },
  ]);
  constructor(private apicall: ApiCallService,private http:HttpClient) {}
  ngOnInit(): void {}
  getAllCategory() {
    return this.apicall.getApi('http://192.168.1.175:5050/categories', {});
  }
  getProducts(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/products', body);
  }
  getSingleProduct(id: any, body: any) {
    return this.apicall.postApi(`http://192.168.1.175:5050/products/${id}`,body);
  }
  setLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }
  getlocalStorage(key: any) {
    return localStorage.getItem(key);
  }
  getCurrencyValueApi() {
    return this.apicall.getApi(`https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD`,{});
  }
  getCarousal() {
    return this.apicall.getApi('http://192.168.1.175:5050', {});
  }
  likedProducts(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/products/favourite',body)
  }
  getFilterOption() {
    return this.apicall.getApi(`http://192.168.1.175:5050/products/filters`,{});
  }
  filterOptions(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/products', body);
  }
  companyLogo() {
    return this.apicall.getApi(`http://192.168.1.175:5050/company`, {});
  }
  register(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/register', body);
  }
  login(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/login', body);
  }
  logoutUser(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/logout', body);
  }
  addTocart(body: any) {
    return this.apicall.postApi('http://192.168.1.175:5050/products/cart',body);
  }
  decodeUserName() {
    let getToken: any = this.getlocalStorage('login');
    if (getToken) {
      let decode: any = jwt_decode(getToken);
      // this.myAccDropdown.dropdown.push('Log out');
       return decode.firstName;
    }
  }
  getAddToCartList(){
    return this.apicall.getApi('http://192.168.1.175:5050/products/cart',{})
  }
  deletecart(id:any){
    return this.http.delete(`http://192.168.1.175:5050/products/cart/remove/${id}`)
  }
  getLikedProductList(){
    return this.apicall.getApi('http://192.168.1.175:5050/products/favourite',{})
  }
  removeFavouriteProduct(id:any){
    return this.http.delete(`http://192.168.1.175:5050/products/favourite/remove/${id}`)
  }
  regenerateToken(){
    return this.apicall.getApi('http://192.168.1.175:5050/token-generate',{})
  }
  ratingReview(body:any){
    return this.apicall.postApi('http://192.168.1.175:5050/products/review',body);
  }
  getRatingReview(id:any){
    return this.apicall.getApi(`http://192.168.1.175:5050/products/review/${id}`,{})
  }
}
