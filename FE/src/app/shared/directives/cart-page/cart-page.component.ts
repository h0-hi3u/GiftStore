import { Router } from '@angular/router';
import { CommunicationService } from './../../../core/services/communication.service';
import { HelperNumber } from './../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/core/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cartUser: CartItem[] = JSON.parse(
    localStorage.getItem('cartUser') || JSON.stringify([])
  );
  totalPrice: number =
    this.cartUser.reduce((total, current) => {
      return total + current.price * current.quantity;
    }, 0) || 0;

    constructor(
      public helperNumber: HelperNumber,
      private communicationService: CommunicationService,
      private router: Router
      ) {}

    ngOnInit(): void {
        
    }
    public decreaseCart(id: string) {
      this.communicationService.triggerDecreaseCart(id);
      this.reloadData();
    }
    public increaseCart(id: string) {
      this.communicationService.triggerIncreaseCart(id);
      this.reloadData();
    }
    public removeFromCart(id: string) {
      this.communicationService.triggerRemoveFromCart(id);
      this.reloadData();
    }
    public changeQuantity(id: string, element: any) {
      const data = {
        id: id,
        element: element
      }
      this.communicationService.triggerChangeQuantity(data);
      this.reloadData();

    }
    private reloadData() {
      this.cartUser = JSON.parse(
        localStorage.getItem('cartUser') || JSON.stringify([])
      );
      this.totalPrice =
      this.cartUser.reduce((total, current) => {
        return total + current.price * current.quantity;
      }, 0) || 0;
  
    }
    public checkout() {
      this.router.navigate(['check-quantity']);
    }
}
