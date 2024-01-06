import { HelperNumber } from './../../../core/helpers/helperNumber';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleUser, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/core/models/cartItem';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  faCircleUser = faCircleUser;
  faCaretLeft = faCaretLeft;
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
  constructor(private router: Router, public helperNumber: HelperNumber){}

  public backToHome() {
    this.router.navigate(["/"]);
  }
  public backToCart() {
    this.router.navigate(['cart']);
  }
  
}
