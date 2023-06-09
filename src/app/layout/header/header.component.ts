import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  toggleCategory:boolean=false
  likeCount:any
  index:any
  categoryList:any
  isActive:any
  addCartCount:any
  breadcrumbList:any
  toggleHeader:any=false
  categories:any={
    title:'Categories',
    categoriesList:[
      {
        name:'Dresses',
        dropdown:['Mens Dresses','Womens Dresses','Kid Dresses']
      },
      {
        name:'Shirt',
        dropdown:[]
      },
      {
        name:'Jeans',
        dropdown:[]
      },
      {
        name:'Swimwear',
        dropdown:[]
      },
      {
        name:'Slipwear',
        dropdown:[]
      },
      {
        name:'sportwear',
        dropdown:[]
      },
      {
        name:'Jumpsuit',
        dropdown:[]
      },
      {
        name:'Blazers',
        dropdown:[]
      },
      {
        name:'Jackets',
        dropdown:[]
      },
      {
        name:'Shoes',
        dropdown:[]
      }
    ],
    navBar:[
      {
        label:'Home',
        route:'/',
        dropdown:''
      },
      {
        label:'Shop',
        route:'/shop',
        dropdown:''
      },
      {
        label:'Contact',
        route:'/contact',
        dropdown:''
      },
    ]
  }
  constructor(private productsService:ProductsService){
    
  }
  ngOnInit(): void {
    this.breadCrumb()
    this.productsService.getAllCategory().subscribe({
      next:(res:any)=>{
        console.log('categories in headewr==>',res.data.categories);
        
        this.categoryList=res.data.categories
      }
    })
    console.log('hello',this.index);
   this.cartCount()
   this.likedProductCount()
  }
  linkActive(index:any){
    this.isActive=index
    this.toggleHeader=false
  }
  
  categoryToggle(){
    this.toggleCategory=!this.toggleCategory
  }
  breadCrumb(){
    this.productsService.breadCrumb.subscribe({
      next:(res:any)=>{
        this.breadcrumbList=res
      }
    })
  }
  cartCount(){
    this.productsService.cartCount.subscribe({
      next:(res:any)=>{
        this.productsService.getAddToCartList().subscribe({
          next:(res:any)=>{
            console.log('get add cart list==>', res);
            this.addCartCount=res.data.length
          }
        })
      }
    })
  }
  likedProductCount(){
    this.productsService.isLikedProduct.subscribe({
      next:(res:any)=>{
        this.productsService.getLikedProductList().subscribe({
          next:(res:any)=>{
            console.log('favourite products rtyrt==>',res);
            this.likeCount=res.data.length
          }
        })
      }
    })
  }
  headerToggle(){
    this.toggleHeader=!this.toggleHeader
  }
}
