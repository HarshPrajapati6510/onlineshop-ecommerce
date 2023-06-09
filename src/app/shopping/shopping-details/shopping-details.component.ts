import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shopping-details.component.scss']
})
export class ShoppingDetailsComponent implements OnInit{
  selected = 0;
  math=Math
  totalRate:any
  productList:any
  singleProductDetail:any
  quantity:any=1
  active:any=1
  paramId:any
  currencyName:any='USD'
  iconList:any=['fa fa-shopping-cart','far fa-heart','fa fa-sync-alt','fa fa-search']
  currencyValue:any
  reviewProductRating:any
  reviewList:any[]=[]
  productDetail:any={
    productName:'Product Name Goes Here',
    rating:4.7,
    review:99,
    price:'$150',
    des:`Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
    clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
    Nonumy`,
    checkBox:[
      {
        title:'Sizes',
        input:['XS','S','M','L','XL'],
      },
      {
        title:'Colors',
        input:['Black','White','Red','Blue','Green'],
      }
    ]
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    nav:true,
    autoplay:true,
    navText:['<i class="fa fa-2x fa-angle-left text-dark carousel-control-prev" ></i>','<i class="fa fa-2x fa-angle-right text-dark carousel-control-next"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
  Options: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    margin:20,
    responsive: {
      0: {
        items: 1
      },
      280: {
        items: 2
      },
      560: {
        items: 3
      },
      900: {
        items: 4
      }
    },
  }
  constructor(private productsService:ProductsService, private activeroute:ActivatedRoute, private route:Router,private reff:ChangeDetectorRef,private toastr:ToastrService){
  }
  ngOnInit(): void {
    // this.rating(3.6)
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
        label:'ShopDetails',
        path:''
      }
    ])
    this.rateCounter(5)
    this.activeroute.paramMap.subscribe({
      next:(res:any)=>{
        // console.log('Param Id==>', res.params.id);
        if (res) {
          this.paramId=res.params.id
          this.singleProduct(res.params.id)
        }
      }
    })
    console.log('quantity',this.quantity);
    this.productsCarousal();
    this.currencyChange()
    this.getReviewList()
  }
  rateCounter(total:any){
    this.totalRate=Array(total)
  }
  singleProduct(id:any){
    this.productsService.getSingleProduct(id,{}).subscribe({
      next:(res:any)=>{
        this.singleProductDetail=res.data.productList
        console.log('single==>',res);
        this.reff.markForCheck()
      }
    })
  }
  quantityChange(){
    if (this.quantity<2) {
      this.quantity=1
    }
    console.log('quantity every time change==>',this.quantity);
    
  }
  quantityPlus(){
    if (this.quantity<1) {
      this.quantity=1
    }
    else{
      this.quantity++;
    }
    console.log(this.quantity);
  }
  quantityMinus(){
    if (this.quantity<2) {
      this.quantity=1
    }
    else{
      this.quantity--
    }
    console.log(this.quantity);
  }
  addToCart(){
    let getToken=this.productsService.getlocalStorage('login')
    if (getToken) {
      this.productsService.addTocart({productId:this.paramId,quantity:this.quantity}).subscribe({
        next:(res:any)=>{
          if (res.type='success') {
            this.productsService.cartCount.next(true)
            this.toastr.success(res.message)
            console.log(res);
          }
        },
      })
    }
    else{
      this.route.navigateByUrl('/sign in')
    }
  }
  productsCarousal(){
    this.productsService.getProducts({}).subscribe({
      next:(res:any)=>{
        this.productList=res.data.productList
        this.reff.markForCheck()
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
  reviewRating(){
    let body={productId:this.paramId,rating:this.selected,review:this.reviewProductRating}
    this.productsService.ratingReview(body).subscribe({
      next:(res:any)=>{
        if (res.type=='success') {
          this.toastr.success(res.message)
          this.getReviewList()
        }
      }
    })
    this.selected=0
    this.reviewProductRating=''
  }
  getReviewList(){
    this.productsService.getRatingReview(this.paramId).subscribe({
      next:(res:any)=>{
        this.reviewList=res.data
      }
    })
  }
}
