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
import { CheckQuantityComponent } from './shared/directives/check-quantity/check-quantity.component';
import { LoginPageComponent } from './shared/directives/login-page/login-page.component';
import { RegisterPageComponent } from './shared/directives/register-page/register-page.component';
import { AccountPageComponent } from './shared/directives/account-page/account-page.component';
import { AccountInfoComponent } from './shared/directives/account-page/account-info/account-info.component';
import { AccountOrdersComponent } from './shared/directives/account-page/account-orders/account-orders.component';
import { ChangePasswordComponent } from './shared/directives/account-page/change-password/change-password.component';
import { OrderDetailComponent } from './shared/directives/account-page/order-detail/order-detail.component';
import { AdminPageComponent } from './shared/directives/admin-page/admin-page.component';
import { AdminDashboardComponent } from './shared/directives/admin-page/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './shared/directives/admin-page/admin-product/admin-product.component';
import { TestFirebaseComponent } from './shared/directives/test-firebase/test-firebase.component';
import { ProductDetailComponent } from './shared/directives/admin-page/product-detail/product-detail.component';
import { CreateProductComponent } from './shared/directives/admin-page/create-product/create-product.component';

const routes: Routes = [
  { path: 'firebase', component: TestFirebaseComponent},
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      { path: '', component: AdminDashboardComponent},
      { path: 'product', component: AdminProductComponent},
      { path: 'product-detail/:id', component: ProductDetailComponent},
      { path: 'create-product', component: CreateProductComponent}
    ]
  },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'check-quantity', component: CheckQuantityComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'search', component: SearchProductComponent },
      { path: 'detail/:id', component: DetailPageComponent },
      { path: 'all', component: ProductListComponent },
      { path: 'collection/:id', component: ProductListComponent },
      { path: 'category/:id', component: ProductListComponent },
      { path: 'tag/:id', component: ProductListComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      {
        path: 'account',
        component: AccountPageComponent,
        children: [
          { path: '', component: AccountInfoComponent},
          { path: 'orders', component: AccountOrdersComponent},
          { path: 'change-password', component: ChangePasswordComponent},
          { path: 'detail-order/:id', component: OrderDetailComponent}
        ]
      },
      { path: 'cart', component: CartPageComponent },
      { path: '**', component: ErrorPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
