import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { AdminService } from './../../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/core/models/dataPoint';
import { DataPointColumn } from 'src/app/core/models/dataPointColumn';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  inMonthDataPoints: DataPoint[] = [];
  inYearDataPoints: DataPointColumn[] = [];
  totalMonthlySales: number = 0;
  totalMonthlyOrders: number = 0;
  constructor(private adminService: AdminService, public helperNumber: HelperNumber) {
  }
  ngOnInit(): void {    
    this.adminService.reportOrderInMonth().subscribe((res: ResponseDto) => {
      this.inMonthDataPoints = res.data;
    });
    this.adminService.reportOrderInYear().subscribe((res: ResponseDto) => {
      this.inYearDataPoints = res.data;
    });
    this.adminService.getMonthlySales().subscribe((res: ResponseDto) => {
      this.totalMonthlySales = res.data;
    });
    this.adminService.getMonthlyOrders().subscribe((res: ResponseDto) => {
      this.totalMonthlyOrders = res.data;
    })
  }
}
