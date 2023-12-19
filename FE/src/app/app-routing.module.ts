import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { SearchProductComponent } from './shared/components/search-product/search-product.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'search', component: SearchProductComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: '**', component: ErrorPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
