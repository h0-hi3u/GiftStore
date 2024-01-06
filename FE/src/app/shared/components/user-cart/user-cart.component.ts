import { HelperNumber } from '../../../core/helpers/helperNumber';
import { AfterContentChecked, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CartItem } from 'src/app/core/models/cartItem';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { Router } from '@angular/router';

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

  @Input() isHiddenCart!: boolean;
  @Output() isHiddenCartChange = new EventEmitter<boolean>();

  constructor(
    private productService: ProductService,
    public helperNumber: HelperNumber,
    private router: Router
  ) {}
  ngOnInit(): void {
  }
  public changeHiddenCart() {

    this.isHiddenCartChange.emit(!this.isHiddenCart);
  }
  public increaseCart(id: string) {
    let a;
    for (let i = 0; i < this.cartUser.length; i++) {
      if (this.cartUser[i].id == id) {
        a = this.cartUser[i];
        break;
      }
    }
    if (a) {
      a.quantity++;
      this.totalPrice += a.price;
      localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
    } else {
      let product;
      this.productService.getProductDetailCart(id).subscribe((res: ResponseDto) => {
        product = res.data;
        if (product) {
          const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageProduct[0].image,
            quantity: 1,
            variant: product.variant,
          } as CartItem;
          this.cartUser.push(cartItem);
          this.totalPrice += cartItem.price;
        }
        localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
      });
    }
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
      this.cartUser[index].quantity = parseInt(currentQuantity);
      localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
    } else {
      let product;
      this.productService.getProductDetailCart(id).subscribe((res: ResponseDto) => {
        product = res.data;
        if (product) {
          const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageProduct[0].image,
            quantity: element.value,
            variant: product.variant,
          } as CartItem;
          this.cartUser.push(cartItem);
          this.totalPrice += cartItem.price;
        }
        localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
      });
    }
  }
  public addManyToCart(data: any) {
    let id = data.id;
    let element = data.element;
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
      this.totalPrice += parseInt(currentQuantity) * a.price;
      this.cartUser[index].quantity += parseInt(currentQuantity);
      localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
    } else {
      let product;
      this.productService.getProductDetailCart(id).subscribe((res: ResponseDto) => {
        product = res.data;
        if (product) {
          const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageProduct[0].image,
            quantity: parseInt(element.value),
            variant: product.variant,
          } as CartItem;
          this.cartUser.push(cartItem);
          this.totalPrice += cartItem.price * cartItem.quantity;
        }
        localStorage.setItem('cartUser', JSON.stringify(this.cartUser));
      });
    }
  }
  public navigationCheckout() {
    this.router.navigate(['checkout'])
  }
}
