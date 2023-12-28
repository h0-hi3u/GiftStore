import { HelperReloadSearch } from '../../pipes/helperReloadSearch';
import { ResponseDto } from './../../../modules/responseDto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductShowDto } from 'src/app/modules/Product/productShowDto';
import { HelperNumber } from '../../pipes/helperNumber';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent implements OnInit, OnDestroy {
  listProductSearch: ProductShowDto[] = [];
  totalRecords: number = 0;
  private reloadSub: Subscription = new Subscription();
  constructor(
    private productService: ProductService,
    public helperNumber: HelperNumber,
    private helperReloadSearch: HelperReloadSearch
  ) {}

  ngOnInit(): void {
    this.reloadSub = this.helperReloadSearch.reload$.subscribe(() => {
      this.searchProduct();
    });
    this.searchProduct();
  }
  ngOnDestroy(): void {
    this.reloadSub.unsubscribe();
  }
  public searchProduct() {
    this.productService
      .searchProduct(this.helperReloadSearch.searchText, 12, 1)
      .subscribe((res: ResponseDto) => {
        this.listProductSearch = res.data.data;
        this.totalRecords = res.data.totalRecords;
      });
  }
}
