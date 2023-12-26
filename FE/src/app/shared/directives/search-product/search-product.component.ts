import { ResponseDto } from './../../../modules/responseDto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductShowDto } from 'src/app/modules/Product/productShowDto';
import { HelperNumber } from '../../pipes/helperNumber';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchText: string = "";
  listProductSearch: ProductShowDto[] = [];
  totalRecords: number = 0;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, public helperNumber: HelperNumber) {}

  ngOnInit(): void {
    this.searchProduct();
    // console.log("init");
  }
  public searchProduct() {
    const inputSearchText = document.getElementById("input-search-text") as HTMLInputElement;
    this.searchText = this.route.snapshot.paramMap.get("searchText") || inputSearchText.value;
    console.log(this.searchText);
    this.productService.searchProduct(this.searchText, 12, 1, 0).subscribe((res: ResponseDto) => {
      this.listProductSearch = res.data.data;
      this.totalRecords = res.data.totalRecords;
    })
  }
}
