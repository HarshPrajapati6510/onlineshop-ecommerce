import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingSidebarComponent } from './shopping-sidebar/shopping-sidebar.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ShoppingProductsComponent } from './shopping-products/shopping-products.component';
import { ShoppingDetailsComponent } from './shopping-details/shopping-details.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LikeproductsComponent } from './likeproducts/likeproducts.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ShoppingSidebarComponent,
    ShoppingPageComponent,
    ShoppingProductsComponent,
    ShoppingDetailsComponent,
    AddCartComponent,
    CheckOutComponent,
    LikeproductsComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    CarouselModule,
    FormsModule,
    NgxPaginationModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbRatingModule
    
  ],
  // providers: [{provide:HTTP_INTERCEPTORS,useClass:CommonInterceptor,multi:true}],
})
export class ShoppingModule { }
