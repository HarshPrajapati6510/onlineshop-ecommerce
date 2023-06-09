import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-logo-carousel',
  templateUrl: './logo-carousel.component.html',
  styleUrls: ['./logo-carousel.component.scss']
})
export class LogoCarouselComponent implements OnInit{
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
      740: {
        items: 4
      },
      900: {
        items: 5
      },
      990:{
        items:6
      }
    },
  }
  // carousalImage:any=["assets/img/vendor-1.jpg","assets/img/vendor-2.jpg","assets/img/vendor-3.jpg","assets/img/vendor-4.jpg","assets/img/vendor-5.jpg","assets/img/vendor-6.jpg","assets/img/vendor-7.jpg","assets/img/vendor-8.jpg"]
  constructor(private productsService:ProductsService){

  }
  carousalImage:any
  ngOnInit(){
    this.companyLogoCarousal()
  }
  companyLogoCarousal(){
    this.productsService.companyLogo().subscribe({
      next:(res:any)=>{
        console.log('company llogo carousal==>',res.data.images);
        this.carousalImage=res.data.images
      }
    })
  }
}
