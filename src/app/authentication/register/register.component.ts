import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  genderList:any=['male','female','other']
  registerData:any={
    firstName:'',
    lastName:'',
    mobile:null,
    gender:'',
    address:{
      country:'',
      state:'',
      city:'',
      line1:'',
      line2:'',
      zipCode:null
    },
    email:'',
    password:'',
    
  }
  constructor(private productsService:ProductsService){
    
  }
  ngOnInit(): void {
    
  }
  registerUser(registeForm:any){
    if (registeForm.valid) {
      this.productsService.register(this.registerData).subscribe({
        next:(res:any)=>{
          console.log('register successfully or not?==>',res);
          
        }
      })
    }
  }

}
