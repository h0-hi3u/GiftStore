import { ResponseDto } from 'src/app/core/models/responseDto';
import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { AdminService } from './../../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ProductWithChildrenDto } from 'src/app/core/models/Product/productWithChildrenDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  listAllProduct: ProductWithChildrenDto[] = [];
  constructor(private adminService: AdminService,
    public helperNumber: HelperNumber,
    private router : Router) {
  }
  ngOnInit(): void {
    this.adminService.getAllParent().subscribe((res: ResponseDto) => {
      this.listAllProduct = res.data;
    })
  }
  goToProductDetail(id: string) {
    this.router.navigate([`admin/product-detail/${id}`]);
  }
  goToAddProduct() {
    this.router.navigate(['admin/create-product']);
  }
}
