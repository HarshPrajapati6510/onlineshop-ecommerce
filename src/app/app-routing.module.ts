import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./products/products.module').then(res=>res.ProductsModule)
  },
  {
    path:'',
    loadChildren:()=>import('./authentication/authentication.module').then(res=>res.AuthenticationModule)
  },
  {
    path:'shop',
    loadChildren:()=>import('./shopping/shopping.module').then(res=>res.ShoppingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
