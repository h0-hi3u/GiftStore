import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { SearchProductComponent } from './shared/directives/search-product/search-product.component';
import { ProductListComponent } from './shared/directives/product-list/product-list.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomePageComponent } from './shared/directives/home-page/home-page.component';
import { ErrorPageComponent } from './shared/directives/error-page/error-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS,HttpClient, HttpClientModule} from '@angular/common/http';
import { SocialFixedComponent } from './shared/components/social-fixed/social-fixed.component';
import { BreadCrumbComponent } from './shared/components/bread-crumb/bread-crumb.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { UserCartComponent } from './shared/components/user-cart/user-cart.component';
import { DetailPageComponent } from './shared/directives/detail-page/detail-page.component';
import { CheckoutPageComponent } from './shared/directives/checkout-page/checkout-page.component';
import { CartPageComponent } from './shared/directives/cart-page/cart-page.component';
import { CheckQuantityComponent } from './shared/directives/check-quantity/check-quantity.component';
import { LoginPageComponent } from './shared/directives/login-page/login-page.component';
import { RegisterPageComponent } from './shared/directives/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountPageComponent } from './shared/directives/account-page/account-page.component';
import { AccountOrdersComponent } from './shared/directives/account-page/account-orders/account-orders.component';
import { AccountInfoComponent } from './shared/directives/account-page/account-info/account-info.component';
import { ChangePasswordComponent } from './shared/directives/account-page/change-password/change-password.component';
import { DatePipe } from '@angular/common';
import { OrderDetailComponent } from './shared/directives/account-page/order-detail/order-detail.component';
import { AdminPageComponent } from './shared/directives/admin-page/admin-page.component';
import { AdminDashboardComponent } from './shared/directives/admin-page/admin-dashboard/admin-dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { ColumnChartComponent } from './shared/components/column-chart/column-chart.component';
import { AdminProductComponent } from './shared/directives/admin-page/admin-product/admin-product.component';
import { TestFirebaseComponent } from './shared/directives/test-firebase/test-firebase.component';
import { environment } from 'src/environment/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideStorage, getStorage} from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SearchProductComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ErrorPageComponent,
    SocialFixedComponent,
    BreadCrumbComponent,
    PaginationComponent,
    UserCartComponent,
    DetailPageComponent,
    CheckoutPageComponent,
    CartPageComponent,
    CheckQuantityComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AccountPageComponent,
    AccountOrdersComponent,
    AccountInfoComponent,
    ChangePasswordComponent,
    OrderDetailComponent,
    AdminPageComponent,
    AdminDashboardComponent,
    PieChartComponent,
    ColumnChartComponent,
    AdminProductComponent,
    TestFirebaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
