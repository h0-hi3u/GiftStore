import { ProductService } from 'src/app/core/services/product.service';
import { HelperNumber } from './../../../core/helpers/helperNumber';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleXmark, faCaretLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { CartItem } from 'src/app/core/models/cartItem';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-check-quantity',
  templateUrl: './check-quantity.component.html',
  styleUrls: ['./check-quantity.component.scss']
})
export class CheckQuantityComponent implements OnInit, AfterContentInit {
  faCircleXmark = faCircleXmark;
  faCaretLeft = faCaretLeft;
  faArrowRight = faArrowRight;

  listProduct: ProductShowDto[] = [];
  listIndex: number[] = [];
  cartUser: CartItem[] = JSON.parse(
    localStorage.getItem('cartUser') || JSON.stringify([])
  );
  totalPrice: number =
  this.cartUser.reduce((total, current) => {
    return total + current.price * current.quantity;
  }, 0) || 0;
  totalProduct: number  = this.cartUser.reduce((total, current) => {
    return total + current.quantity;
  }, 0) || 0;
  constructor(private router: Router, public helperNumber: HelperNumber, private productService: ProductService) {}

  ngOnInit(): void {
    for(let i = 0; i < this.cartUser.length; i++) {
      this.productService.getProductDetailCart(this.cartUser[i].id).subscribe((res: ResponseDto) => {
        this.listProduct.push(res.data);
        if(this.cartUser[i].quantity > res.data.quantity) {
          this.listIndex.push(i);
        }
      });
    }
  }
  ngAfterContentInit(): void {
    console.log(this.listIndex);
    
    if(this.listIndex.length < 1) {
      console.log(" < 1");
    }
  }
  public backToHome() {
    this.router.navigate(["/"]);
  }
  public backToCart() {
    this.router.navigate(['cart']);
  }
  public goToCheckout() {
    this.setValidQuantity();
    this.router.navigate(['checkout']);
  }
  public setValidQuantity() {
    for(let i = 0; i < this.listIndex.length; i++) {
      let index = this.listIndex[i];
      this.cartUser[index].quantity = this.listProduct[i].quantity;
    };
    localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  }
  public setZeroQuantity(indexList: number, indexIndex: number) {
    this.listIndex.splice(indexIndex, 1);
    this.cartUser.splice(indexList, 1);
    this.listProduct.splice(indexList, 1);
    this.totalPrice =this.cartUser.reduce((total, current) => {
      return total + current.price * current.quantity;
    }, 0) || 0;
    localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  }
}
