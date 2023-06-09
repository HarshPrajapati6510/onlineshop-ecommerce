import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-shopping-sidebar',
  templateUrl: './shopping-sidebar.component.html',
  styleUrls: ['./shopping-sidebar.component.scss']
})
export class ShoppingSidebarComponent implements OnInit{
  math=Math
  filterOptionList:any
  pricefilter:any[]=[]
  colorFilter:any[]=[]
  sizeFilter:any[]=[]
  filterProductList:any
  currencyName:any
  currencyValue:any
  checked:any
  filterData:any={
    filter:{
      price:[],
      color:[],
      size:[],
    }
  }
  constructor(private productsService:ProductsService){
  }
  ngOnInit(): void {
    this.filterOption()
    this.currencyChange()
  }
  filterOption(){
    this.productsService.getFilterOption().subscribe({
      next:(res:any)=>{
        this.filterOptionList=res.data
        console.log('filter option==>',this.filterOptionList);
      }
    })
  }
  filterProducts(){
    this.productsService.filterOptions({"filter":{"price":this.pricefilter,"color":this.colorFilter,"size":this.sizeFilter},}).subscribe({
      next:(res:any)=>{
        console.log('filter ho gaya?==>',res);
        this.filterProductList=res.data.productList
      }
    })
  }
  filtering(filterOption:any){
    if (filterOption.min&&filterOption.max) {
      if (this.pricefilter.length) {
        let boolean=this.pricefilter.some((element:any)=>(element.min==filterOption.min)&&(element.max==filterOption.max))
        for (let i = 0; i < this.pricefilter.length; i++) {
          if ((this.pricefilter[i].min==filterOption.min)&&(this.pricefilter[i].max==filterOption.max)) {
            this.pricefilter.splice(i,1)
          }
        }
        if (!boolean) {
          this.pricefilter.push({"min":filterOption.min,"max":filterOption.max})
        }
      }
      else{
        this.pricefilter.push({"min":filterOption.min,"max":filterOption.max})
      }
      console.log('filter ho raha ke nahi==>',this.pricefilter);
    }
    if (filterOption.color) {
      if (this.colorFilter.includes(filterOption.color)) {
        this.colorFilter.splice(this.colorFilter.indexOf(filterOption.color),1)
      }
      else{
        this.colorFilter.push(filterOption.color)
      }
      console.log('color filter==>',this.colorFilter);
    }
    if (filterOption.size) {
      if (this.sizeFilter.includes(filterOption.size)) {
        this.sizeFilter.splice(this.sizeFilter.indexOf(filterOption.size),1)
      }
      else{
        this.sizeFilter.push(filterOption.size)
      }
      console.log('color filter==>',this.sizeFilter);
    }
    this.filterData={
      filter:{
        price:this.pricefilter,
        color:this.colorFilter,
        size:this.sizeFilter,
      }
    }
    // this.filterProducts()
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
