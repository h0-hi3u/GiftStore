import { CommunicationService } from './../../../core/services/communication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { HelperNumber } from '../../../core/helpers/helperNumber';
import { CartItem } from 'src/app/core/models/cartItem';
import { Router } from '@angular/router';
import { BestSellerService } from 'src/app/core/services/bestSeller.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  slideIndex: number = 1;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  timeoutId: any;
  listNewProduct: ProductShowDto[] = [];
  cartUser: CartItem[] = JSON.parse(
    localStorage.getItem('cartUser') || JSON.stringify([])
  );
  listBestSeller: ProductShowDto[] = [];
  ngOnInit(): void {
    this.getNewProduct();
    this.getBestSeller();
    this.showDiv(this.slideIndex);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }
  constructor(
    private productService: ProductService,
    private bestSellerService: BestSellerService,
    public helperNumber : HelperNumber,
    private communicationService: CommunicationService,
    private router: Router  ) {

  }
  //#region  slide show banner
  public plusDiv(n: number) {
    this.slideIndex += n;
    this.showDiv(this.slideIndex);
  }
  public carousel() {
    this.timeoutId = setTimeout(() => {
      this.slideIndex += 1;
      this.showDiv(this.slideIndex);
    }, 2000);
  }
  public showDiv(n: number) {
    // clear timeout when user click next image
    clearTimeout(this.timeoutId);
    //handle image
    let x = document.getElementsByClassName('slide-image');
    if (x.length != 0) {
      this.slideIndex = n;
      if (this.slideIndex > x.length) {
        this.slideIndex = 1;
      }
      if (this.slideIndex < 1) {
        this.slideIndex = x.length;
      }
      for (let i = 0; i < x.length; i++) {
        if (x[i].classList.contains('slide-block')) {
          x[i].classList.remove('slide-block');
        }
      }
      x[this.slideIndex - 1].classList.add('slide-block');

      //handle dots
      let dots = document.getElementsByClassName('dot');
      for (let i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('dot-active')) {
          dots[i].classList.remove('dot-active');
        }
      }
      dots[this.slideIndex - 1].classList.add('dot-active');
      this.carousel();
    }
  }
  //#endregion

  //#region get new product
  public getNewProduct() {
    this.productService.getNewProduct().subscribe((res: ResponseDto) => {
      this.listNewProduct = res.data;
    });
  }
  public getBestSeller() {
    this.bestSellerService.GetAll().subscribe((res: ResponseDto) => {
      this.listBestSeller = res.data;
    })
  }
  //#endregion
  public addToCart(id: string) {
    this.communicationService.triggerFunction(id);
  }
  public moveToDetail(id: string) {
    this.router.navigate([`detail/${id}`]);
  }
  public moveToCollection(id: string) {
    this.router.navigate([`collection/${id}`]);
  }
}
