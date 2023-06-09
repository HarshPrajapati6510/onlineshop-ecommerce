import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { ShoppingDetailsComponent } from './shopping-details/shopping-details.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LikeproductsComponent } from './likeproducts/likeproducts.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'shoplist',
    pathMatch:'full'
  },
  {
    path:'shoplist',
    component:ShoppingPageComponent
  },
  {
    path:'shoplist/:category',
    component:ShoppingPageComponent
  },
  {
    path:'shopdetails/:id',
    component:ShoppingDetailsComponent
  },
  {
    path:'add-to-cart',
    component:AddCartComponent
  },
  {
    path:'checkout',
    component:CheckOutComponent
  },
  {
    path:'likedproduct',
    component:LikeproductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
