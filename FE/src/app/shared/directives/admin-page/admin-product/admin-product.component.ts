import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { BestSellerDto } from 'src/app/core/models/BestSeller/bestSellerDto';
import { AdminService } from './../../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  listBestSeller: BestSellerDto[] = [];
  constructor(private adminService: AdminService,
    public helperNumber: HelperNumber) {

  }
  ngOnInit(): void {
      this.adminService.getBestSeller().subscribe((res: ResponseDto) => {
        this.listBestSeller = res.data;
      })
  }
}
