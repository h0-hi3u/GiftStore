import { AuthService } from './../../../../core/services/auth.service';
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
  email: string = "";
  constructor(
    private orderService: OrderService,
    public helperNumber: HelperNumber,
    public helperDate: HelperDate,
    private router: Router,
    private authService: AuthService
    ){}
  ngOnInit(): void {
    this.email = this.getInfoUser();
      this.orderService.getOrdersOfUser(this.email).subscribe((res: ResponseDto) => {
        this.listOrder = res.data;
      })
  }
  public goToOrderDetail(id: string) {
    this.router.navigate([`account/detail-order/${id}`]);
  }
  public getInfoUser() : string {
    const token = localStorage.getItem('access_token') || '';
    let a = this.authService.getInfoToken(token);
    return a.email;
  }
}
