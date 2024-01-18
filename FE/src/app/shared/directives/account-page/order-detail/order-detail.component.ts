import { OrderService } from './../../../../core/services/order.service';
import { OrderDetailShowDto } from 'src/app/core/models/Order/orderDetailShowDto';
import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  listOrderDetail: OrderDetailShowDto[] = [];
  totalPrice: number = 0;
  urlArr: string[] = [];
  constructor(
    public helperNumber: HelperNumber,
    private orderService: OrderService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.urlArr = this.router.url.split('/');
      this.orderService.getOrderDetail(this.urlArr[this.urlArr.length - 1]).subscribe((res: ResponseDto) => {
        this.listOrderDetail = res.data;
        this.totalPrice = this.listOrderDetail.reduce((total, current) =>  {
          return total + ((current.price * current.quantity) - ((current.price * current.quantity) * (current.discount / 100)));
        }, 0) || 0;
      })
  }
}
