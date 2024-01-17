import { OrderService } from './../../../../core/services/order.service';
import { OrderDetailShowDto } from 'src/app/core/models/Order/orderDetailShowDto';
import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  listOrderDetail: OrderDetailShowDto[] = [];
  totalPrice: number = 0;
  constructor(
    public helperNumber: HelperNumber,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
      this.orderService.getOrderDetail('362A6217-BD26-4EC2-A2D4-4A18DAA61660').subscribe((res: ResponseDto) => {
        this.listOrderDetail = res.data;
        this.totalPrice = this.listOrderDetail.reduce((total, current) =>  {
          return total + ((current.price * current.quantity) - ((current.price * current.quantity) * (current.discount / 100)));
        }, 0) || 0;
      })
  }
}
