import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-likeproducts',
  templateUrl: './likeproducts.component.html',
  styleUrls: ['./likeproducts.component.scss']
})
export class LikeproductsComponent implements OnInit{
  math=Math
  totalRate:any
  productList:any[]=[]
  constructor(private productsservice:ProductsService,private toastr:ToastrService){
  }
  ngOnInit(): void {
    this.productsservice.breadCrumb.next([
      {
        label:'Home',
        path:''
      },
      {
        label:'Shop',
        path:'/shop'
      },
      {
        label:'FavouriteProducts',
        path:''
      }
    ])
    this.totalRate=this.ratingCount(5)
    this.getLikedProducts()
  }
  ratingCount(total:any){
    return Array(total)
  }
  getLikedProducts(){
    this.productsservice.getLikedProductList().subscribe({
      next:(res:any)=>{
        console.log('favourite products==>',res);
        this.productList=res.data
      }
    })
  }
  removeLike(id:any){
   console.log('favourite id==>', id);
   this.productsservice.removeFavouriteProduct(id).subscribe({
    next:(res:any)=>{
      console.log('remove successfully==>>',res);
      if (res.type=='success') {
        this.toastr.success(res.message)
        this.productsservice.isLikedProduct.next(true)
        this.getLikedProducts()
      }
    }
   })
   
  }
}
