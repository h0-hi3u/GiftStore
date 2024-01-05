import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { SearchProductComponent } from './shared/directives/search-product/search-product.component';
import { ProductListComponent } from './shared/directives/product-list/product-list.component';
import { HomePageComponent } from './shared/directives/home-page/home-page.component';
import { ErrorPageComponent } from './shared/directives/error-page/error-page.component';
import { DetailPageComponent } from './shared/directives/detail-page/detail-page.component';
import { CheckoutPageComponent } from './shared/directives/checkout-page/checkout-page.component';
import { CartPageComponent } from './shared/directives/cart-page/cart-page.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutPageComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'search', component: SearchProductComponent },
      { path: 'detail/:id', component: DetailPageComponent},
      { path: 'all', component: ProductListComponent },
      { path: 'collection/:id', component: ProductListComponent},
      { path: 'category/:id', component: ProductListComponent},
      { path: 'tag/:id', component: ProductListComponent},
      { path: 'cart', component: CartPageComponent},
      { path: '**', component: ErrorPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
