import { OrderService } from './../../../../core/services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent {
  constructor(private orderService: OrderService){}
}
