import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit{
  math=Math
  totalRate:any
  productList:any
  currencyValue:any
  currencyName:any='USD'
  iconList:any=['fa fa-shopping-cart','far fa-heart','fa fa-sync-alt','fa fa-search']
  recentProduct:any={
    title:'Recent Products'
  }
  constructor(private productsService:ProductsService){
  }
  ngOnInit(): void {
    this.rateCounter(5)
    this.recentProducts()
    this.currencyChange()
  }
  rateCounter(total:any){
    this.totalRate=Array(total)
  }
  //recent products subscribe
  recentProducts(){
    this.productsService.getProducts({"type":"recent","limit":8}).subscribe({
      next:(res:any)=>{
        console.log('Feature products==>',res);
        this.productList=res.data?.productList
      }
    })
  }
  //get currency apidata from local storage
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
