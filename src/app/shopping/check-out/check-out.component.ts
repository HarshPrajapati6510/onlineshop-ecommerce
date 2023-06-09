import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  subTotal:any=0
  total:any=0
  prodcutTotalList:any[]=[]
  currencyName:any='USD'
  currencyValue:any
  forms:any[]=['Billing Address']
  billingAddress:any={
    firstname:'',
    lastname:'',
    email:'',
    mobile:'',
    address1:'',
    address2:'',
    country:'',
    city:'',
    state:'',
    zipcode:'',
    shipDiffAddress:''
  }
  constructor(private productsService:ProductsService){

  }
  ngOnInit(): void {
    this.productsService.breadCrumb.next([
      {
        label:'Home',
        path:''
      },
      {
        label:'Shop',
        path:'/shop'
      },
      {
        label:'Check-Out',
        path:''
      }
    ])
    this.orderTotal()
    this.currencyChange()
  }
  checkbox(){
    if (this.billingAddress.shipDiffAddress) {
      this.forms.push('Shipping Address')
    }
    else{
      this.forms.pop()
    }
  }
  checkoutSubmit(){
    console.log();
    
  }
  orderTotal(){
    this.productsService.getAddToCartList().subscribe({
      next:(res:any)=>{
        console.log('get add cart list==>', res);
        this.prodcutTotalList=res.data
        this.prodcutTotalList.forEach((element:any) => {
          this.subTotal+=element.price*element.quantity
        });
        this.total=this.subTotal+10
      }
    })
  }
  currencyChange(){
    this.productsService.currency.subscribe({
      next:(res:any)=>{
        let getCurrencyName:any=this.productsService.getlocalStorage('currencyValue')
        let getCurrencyApiData:any=this.productsService.getlocalStorage('currencyApiData')
        getCurrencyApiData=JSON.parse(getCurrencyApiData)
        this.currencyName=getCurrencyName
        this.currencyValue=getCurrencyApiData[getCurrencyName]
      }
    })
  }
}
