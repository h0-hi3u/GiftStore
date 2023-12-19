import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { SearchProductComponent } from './shared/components/search-product/search-product.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SearchProductComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
