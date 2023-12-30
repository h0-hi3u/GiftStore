import { HelperReloadSearch } from '../../../core/helpers/helperReloadSearch';
import { ResponseDto } from '../../../core/models/responseDto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { HelperNumber } from '../../../core/helpers/helperNumber';
import { Subscription } from 'rxjs';
import { ConstantsService } from 'src/app/core/helpers/constantsService';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent implements OnInit, OnDestroy {
  listProductSearch: ProductShowDto[] = [];
  totalRecords: number = 0;
  pageIndex = 1;
  pageSize = ConstantsService.PAGE_SIZE_SEARCH_PAGE;
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
      .searchProduct(this.helperReloadSearch.searchText, this.pageSize, this.pageIndex)
      .subscribe((res: ResponseDto) => {
        this.listProductSearch = res.data.data;
        this.totalRecords = res.data.totalRecords;
      });
  }
}
