import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  contactForm:any={
    name:'',
    email:'',
    subject:'',
    message:''
  }
  constructor(private productsService:ProductsService){

  }
  ngOnInit(): void {
    this.productsService.breadCrumb.next([
      {
        label:'Home',
        path:'/'
      },
      {
        label:'Contact',
        path:''
      }
    ])
  }
  contactSubmit(){
    
  }
}
