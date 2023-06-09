import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  constructor(private productsService:ProductsService){

  }
  ngOnInit(): void {
    this.productsService.breadCrumb.next([
      {
        label:'Home',
        path:'/'
      }
    ])
  }
}
