import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit{
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
  offerList:any
  constructor(private productsService:ProductsService){

  }
  ngOnInit(){
    this.offer()
  }
  offer(){
    this.productsService.getCarousal().subscribe({
      next:(res:any)=>{
        console.log('carousal==>',res);
        this.offerList=res.data.special_offer
      }
    })
  }
}
