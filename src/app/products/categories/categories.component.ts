import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categoriesList:any[]=[]
  constructor(private productsService:ProductsService){

  }
  ngOnInit(): void {
    this.productsService.getAllCategory().subscribe({
      next:(res:any)=>{
        console.log('allCategory==>',res.data.categories
        );
        this.categoriesList=res.data.categories
      }
    })
  }
}
