import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  logindata:any={
    email:'',
    password:''
  }
  constructor(private productsservice:ProductsService, private location:Location,private route:Router,private toastr:ToastrService){

  }
  ngOnInit(){
    
  }
  loginBtn(loginForm:any){
    console.log('logindata==>',this.logindata);
    if (loginForm.valid) {
      this.productsservice.login(this.logindata).subscribe({
        next:(res:any)=>{
          if (res.type=='success') {
            console.log('login',res.data.token);
            this.productsservice.setLocalStorage('login',res.data.token)
            this.toastr.success(res.message)
            this.productsservice.isLogin.next(true)
            // this.location.back()
            this.route.navigateByUrl('/')
          }
        },
        error:(err:any)=>{
          this.toastr.error('invlid email or password')
        }
      })
    }
  }
}
