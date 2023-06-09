import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit{
  shippingVal:any=10
  addCartList:any[]=[]
  totalAmount:any
  currencyName:any='USD'
  currencyValue:any
  constructor(private productsService:ProductsService, private activeroute:ActivatedRoute, private changedetreff:ChangeDetectorRef,private toastr:ToastrService, private router:Router){
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
        label:'Addcart',
        path:''
      }
    ])
    this.getProductList()
    this.totalCount()
    this.currencyChange()
  }
 getProductList(){
  this.productsService.getAddToCartList().subscribe({
    next:(res:any)=>{
      console.log('get add cart list==>', res);
      this.addCartList=res.data
      console.log('sdfswf==>',this.addCartList);
      this.totalCount()
      this.changedetreff.markForCheck()
    }
  })
}

quantityIncrease(index:any){
    this.addCartList[index].quantity++
    this.totalCount()
 }
 quantityDecrease(index:any){
  if (this.addCartList[index].quantity>1) {
    this.addCartList[index].quantity--
  }else{
    this.addCartList[index].quantity=1
  }
  this.totalCount()
 }
 totalCount(){
  this.totalAmount=0
  this.addCartList.forEach((element:any)=>{
    this.totalAmount+=(element.price*element.quantity)
  })
  console.log('amount mil jaa ===>', this.totalAmount);
 }
 removeCart(id:any){
  console.log('id==>',id);
  this.productsService.deletecart(id).subscribe({
    next:(res:any)=>{
      if (res.type=='success') {
        this.toastr.success(res.message)
        this.productsService.cartCount.next(true)
        this.getProductList()
      }
    }
  })
 }
 changeQuantity(){
  this.totalCount()
 }
 currencyChange(){
  this.productsService.currency.subscribe({
    next:(res:any)=>{
      let getCurrencyName:any=this.productsService.getlocalStorage('currencyValue')
      let getCurrencyApiData:any=this.productsService.getlocalStorage('currencyApiData')
      getCurrencyApiData=JSON.parse(getCurrencyApiData)
      this.currencyName=getCurrencyName
      this.currencyValue=getCurrencyApiData[getCurrencyName]
      this.changedetreff.markForCheck()
    }
  })
  
  
}
//  checkOut(){
//   // this.productsService.addTocart({productId:this.paramId,quantity:this.quantity}).subscribe({
//   //   next:(res:any)=>{
//   //     if (res.type='success') {
//   //       this.productsService.cartCount.next(true)
//   //       this.toastr.success(res.message)
//   //       console.log(res);
        
//   //     }
//   //   },
//   // })
//   this.productsService.setLocalStorage('addCartList',JSON.stringify(this.addCartList))
//  }
}
