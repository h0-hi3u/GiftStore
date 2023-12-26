import { Component} from '@angular/core';

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent {
  isHidden : boolean = true;
  public hiddenCart() {
    this.isHidden = false;
  }
}
