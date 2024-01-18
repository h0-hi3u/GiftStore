import { HelperDate } from './../../../../core/helpers/helperDate';
import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { OrderShowResponseDto } from 'src/app/core/models/Order/orderShowResponseDto';
import { OrderService } from './../../../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {
  listOrder: OrderShowResponseDto[] = [];

  constructor(
    private orderService: OrderService,
    public helperNumber: HelperNumber,
    public helperDate: HelperDate,
    private router: Router
    ){}
  ngOnInit(): void {
      this.orderService.getOrdersOfUser('test@gmail.com').subscribe((res: ResponseDto) => {
        console.log(res);
        
        this.listOrder = res.data;
      })
  }
  public goToOrderDetail(id: string) {
    this.router.navigate([`account/detail-order/${id}`]);
  }
}
