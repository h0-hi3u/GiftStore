import { HelperNumber } from './../../pipes/helperNumber';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductShowDto } from 'src/app/modules/Product/productShowDto';
import { CartItem } from 'src/app/modules/cartItem';
import { ResponseDto } from 'src/app/modules/responseDto';

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  cartUser: CartItem[] = JSON.parse(
    localStorage.getItem('cartUser') || JSON.stringify([])
  );
  totalPrice: number =
    this.cartUser.reduce((total, current) => {
      return total + current.price * current.quantity;
    }, 0) || 0;
  isHidden: boolean = true;
  constructor(
    private productService: ProductService,
    public helperNumber: HelperNumber
  ) {}
  ngOnInit(): void {
    // this.initCart();
  }
  public hiddenCart() {
    this.isHidden = false;
  }
  // public initCart() {
  //   const cart = localStorage.getItem('cartUser');
  //   if(cart) {
  //     this.cartUser = JSON.parse(cart);
  //   }
  //   if(this.cartUser.length == 0) {
  //     for(let i = 0; i < 5; i++) {
  //       let a = {id: i.toString(), name: "Gấu trúc bông xù cao cấp Fufu", image: "https://bizweb.dktcdn.net/thumb/compact/100/450/808/products/aa73afd0-498d-4212-a7da-e108a05a96eb.jpg", quantity: i + 1, price: i + 1} as CartItem
  //       this.cartUser.push(a);
  //     }
  //   }
  //   this.totalPrice = this.cartUser.reduce((total, current) => {
  //     return total + (current.price * current.quantity);
  //   }, 0);
  //   localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  // }
  public increaseCart(id: string) {
    let a;
    for (let i = 0; i < this.cartUser.length; i++) {
      if (this.cartUser[i].id == id) {
        a = this.cartUser[i];
        break;
      }
    }
    if (a) {
      a.quantity += 1;
      this.totalPrice += a.price;
    } else {
      let product;
      this.productService.getProductDetail(id).subscribe((res: ResponseDto) => {
        product = res.data;
        if (product) {
          const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageProduct[0].image,
            quantity: 1,
          } as CartItem;
          this.cartUser.push(cartItem);
          this.totalPrice += cartItem.price;

        }
      });
    }
    localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  }
  public decreaseCart(id: string) {
    let a;
    let index = -1;
    for (let i = 0; i < this.cartUser.length; i++) {
      if (this.cartUser[i].id == id) {
        a = this.cartUser[i];
        index = i;
        break;
      }
    }
    if (a) {
      this.totalPrice -= a.price;
      if (a.quantity < 2) {
        this.cartUser.splice(index, 1);
      } else {
        this.cartUser[index].quantity -= 1;
      }
    } else {
      console.log('not found to remove from cart');
    }
    localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  }
  public removeFromCart(id: string) {
    let a;
    let index = -1;
    for (let i = 0; i < this.cartUser.length; i++) {
      if (this.cartUser[i].id == id) {
        a = this.cartUser[i];
        index = i;
        break;
      }
    }
    if (a) {
      this.cartUser.splice(index, 1);
      this.totalPrice -= a.quantity * a.price;
    }
    localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  }
  public changQuantity(id: string, element: any) {
    let a;
    let index = -1;
    for (let i = 0; i < this.cartUser.length; i++) {
      if (this.cartUser[i].id == id) {
        a = this.cartUser[i];
        index = i;
        break;
      }
    }
    if(a) {
      let currentQuantity = element.value;
      if(element.value < 1) {
        currentQuantity = 1;
        element.value = 1;
      } 
      this.totalPrice += (currentQuantity - a.quantity) * a.price;
      this.cartUser[index].quantity = currentQuantity;
    } else {
      console.log("error change quantity");
    }
    localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
  }
}
