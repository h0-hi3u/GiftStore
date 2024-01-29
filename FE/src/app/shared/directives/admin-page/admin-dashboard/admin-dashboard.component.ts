import { ResponseDto } from 'src/app/core/models/responseDto';
import { AdminService } from './../../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/core/models/dataPoint';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  inMonthDataPoints: DataPoint[] = [];
  inYearDataPoints: DataPoint[] = [];
  constructor(private adminService: AdminService) {
  }
  ngOnInit(): void {    
    this.adminService.reportOrderInMonth().subscribe((res: ResponseDto) => {
      this.inMonthDataPoints = res.data;
    });
    this.adminService.reportOrderInYear().subscribe((res: ResponseDto) => {
      this.inYearDataPoints = res.data;
      console.log(this.inYearDataPoints);
      
      this.inYearDataPoints = this.inYearDataPoints.sort((a, b) => parseInt(a.name) - parseInt(b.name));
    });
  }
}
