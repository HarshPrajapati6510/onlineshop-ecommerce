import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Width } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss']
})
export class CarousalComponent implements OnInit{
  carousalList:any
  offerList:any
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    margin: 10,
    navSpeed: 700,
    items:1,
    
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
    
  };
  // carousel:any=[
  //   {
  //     imgUrl:"assets/img/carousel-1.jpg",
  //     name:'Men Fashion',
  //     des:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam'
  //   },
  //   {
  //     imgUrl:"assets/img/carousel-2.jpg",
  //     name:'Women Fashion',
  //     des:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam'
  //   },
  //   {
  //     imgUrl:"assets/img/carousel-3.jpg",
  //     name:'Kid Fashion',
  //     des:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam'
  //   }
  // ]
  // offerList:any=[
  //   {
  //     imgurl:"assets/img/offer-1.jpg",
  //     title:'Special Offer',
  //     dis:'Save 20%'
  //   },
  //   {
  //     imgurl:"assets/img/offer-2.jpg",
  //     title:'Special Offer',
  //     dis:'Save 20%'
  //   }
  // ]
  constructor(private productsService:ProductsService){

  }
  ngOnInit(){
    this.carousal()
  }
  carousal(){
    this.productsService.getCarousal().subscribe({
      next:(res:any)=>{
        console.log('carousal==>',res);
        this.carousalList=res.data.carousel
        this.offerList=res.data.special_offer
      }
    })
  }
}
