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
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
