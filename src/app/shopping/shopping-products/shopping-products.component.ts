import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-shopping-products',
  templateUrl: './shopping-products.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shopping-products.component.scss']
})
export class ShoppingProductsComponent implements OnInit,OnChanges{
  @Input() filterList:any
  ratingcount:any=0
  totalRate:any=5
  totalProducts:any
  math=Math
  productList:any[] = [];
  page:any=1
  total:any=20
  paramCategory:any
  tflag:any=false
  bflag:any=true
  currencyValue:any
  currencyName:any='USD'
  likedProductsList:any[]=[]
  iconList:any=['fa fa-shopping-cart','far fa-heart','fa fa-sync-alt','fa fa-search']
  sorting:any={
      title:'Sorting',
      btn:["rating","price"]
  }
  showing:any={
      title:'Showing',
      btn:['10','20','30']
  }
  body:any = {
    limit:6,
    page:1, 
  }
  constructor(private productsService:ProductsService,private activeroute:ActivatedRoute,private cdr:ChangeDetectorRef, private toastr:ToastrService){
  }
  ngOnInit(): void {
    //breadcrumb
    this.productsService.breadCrumb.next([
      {
        label:'Home',
        path:'/'
      },
      {
        label:'Shop',
        path:'/shop'
      }
    ])
    this.activeroute.queryParams.subscribe({
      next:(params:any)=>{
          //serching products get
          if (params.search) {
            this.apiCall({search:params.search})
            this.cdr.markForCheck()
          }
          //specific categories products
          else if(params.category) {
            console.log('category==>',params);
            this.apiCall({category:params.category})
            this.cdr.markForCheck()
          }
          //all products
          else{
            this.apiCall({})
            this.cdr.markForCheck()
          }
        }
      })
      this.currencyChange()
    //rating function
    this.rateCounter(5)
    //currency
  }
  ngOnChanges() {
    console.log('filter data==>', this.filterList);
    this.body.filter=this.filterList.filter
    this.apiCall(this.body)
  }
  rateCounter(total:any){
    this.totalRate=Array(total)
  }
  sortingProducts(value:any){
    this.body.sort={
      field:value,
      order:"desc"
    }
    //call common function
    this.apiCall(this.body)
  }
  productOrganize(value:any){
    if (value=='block') {
      this.bflag=true
      this.tflag=false
    }
    else{
      this.tflag=true
      this.bflag=false
    }
  }
  pagination(val:any){
    this.page=val;
    this.body.page = val;
    //call common api function
    this.apiCall(this.body)
  }
  likeProducts(id:any){
  //  console.log('id==>',id);
  this.productsService.likedProducts({productId:id}).subscribe({
    next:(res:any)=>{
      res.type=='success'? this.toastr.success(res.message):this.toastr.info(res.message)
      this.productsService.isLikedProduct.next(true)
      this.cdr.markForCheck()
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
        this.cdr.markForCheck()
      }
    })
  }
  //common function for same api call
  apiCall(body:any){
    this.productsService.getProducts(body).subscribe({
      next:(res:any)=>{
        this.productList = res.data?.productList
        if (res.totalProduct) {
          this.totalProducts=res.totalProduct
        }
        this.cdr.markForCheck();
      }
    })
    console.log('product list',this.productList);
  }
}
