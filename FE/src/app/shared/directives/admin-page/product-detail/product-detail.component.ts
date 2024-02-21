import { HelperNumber } from './../../../../core/helpers/helperNumber';
import { AdminService } from './../../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { ProductWithChildrenDto } from 'src/app/core/models/Product/productWithChildrenDto';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  currentProduct : ProductWithChildrenDto = {} as ProductWithChildrenDto;
  constructor(
    private adminService: AdminService,
    private router: Router,
    public helperNumber: HelperNumber
  ) {}
  ngOnInit(): void {
    const listUrl = this.router.url.split('/');
    const productId = listUrl[listUrl.length - 1];
    this.adminService.getAllInfoProduct(productId).subscribe((res: ResponseDto) => {
      this.currentProduct = res.data;
      console.log(this.currentProduct);    
    });
  }
}
