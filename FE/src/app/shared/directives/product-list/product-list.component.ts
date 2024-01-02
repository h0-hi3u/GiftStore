import { CommunicationService } from './../../../core/services/communication.service';
import { CategoryService } from './../../../core/services/category.service';
import { HelperNumber } from '../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from 'src/app/core/services/collection.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TagService } from 'src/app/core/services/tag.service';
import { Category } from 'src/app/core/models/Category/category';
import { Collection } from 'src/app/core/models/Collection/collection';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { Tag } from 'src/app/core/models/Tag/tag';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { ConstantsService } from 'src/app/core/helpers/constantsService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  searchFor: string = "";
  id: string = "";
  arrUrl: string[] = [];
  listProduct: ProductShowDto[] = [];
  listCollection: Collection[] = [];
  listCategorySort: any;
  stringTitle: string = "";
  sortOption: number = 0;
  pageIndex: number = 1;
  totalRecords: number = 0;
  pageSize: number = ConstantsService.PAGE_SIZE_LIST_PAGE;
  optionsSort = [
    { name: "Mặc định", value: 0 },
    { name: "A -> Z", value: 1 },
    { name: "Z -> A", value: 2 },
    { name: "Giá tăng dần", value: 3 },
    { name: "Giá giảm dần", value: 4 },
    { name: "Hàng mới nhất", value: 5 },
    { name: "Hàng cũ nhất", value: 6 },
  ]
  constructor(
    private router: Router,
    private productService: ProductService,
    public helperNumber: HelperNumber,
    private collectionService: CollectionService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private communicationService: CommunicationService ) {
  }
  ngOnInit(): void {
      this.arrUrl = this.router.url.split('/');
      this.searchFor = this.arrUrl[1];
      this.id = this.arrUrl[2] || "";
      this.initAll(this.id, this.searchFor);
  }
  public initAll(id: string, searchFor: string) {
    switch(searchFor) {
      case "collection": 
        this.productService.getProductWithCollection(id, this.pageSize, this.pageIndex, this.sortOption)
        .subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
          this.totalRecords = res.data.totalRecords;
        });

        this.collectionService.getCollectionDetail(id)
        .subscribe((res: ResponseDto) => {
          this.stringTitle = res.data.name;
        })
        break;
      case "tag":
        this.productService.getProductWithTag(id, this.pageSize, this.pageIndex, this.sortOption)
        .subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
          this.totalRecords = res.data.totalRecords;
        });

        this.tagService.getTagDetail(id).subscribe((res: ResponseDto) => {
          this.listCategorySort = res.data.category as Category[];
        });

        this.tagService.getTagDetail(id).subscribe((res: ResponseDto) => {
          this.stringTitle = res.data.name;
        });
        break;
      case "category":
        this.productService.getProductWithCategory(id, this.pageSize, this.pageIndex, this.sortOption)
        .subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
          this.totalRecords = res.data.totalRecords;
        });

        this.categoryService.getCategoryDetail(id)
        .subscribe((res: ResponseDto) => {
          this.stringTitle = res.data.name;
        });
        break;
      default:
        this.productService.getProductAll(this.pageSize, this.pageIndex, this.sortOption)
        .subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
          this.totalRecords = res.data.totalRecords;
        });

        this.tagService.getTagAll().subscribe((res: ResponseDto) => {
          this.listCategorySort = res.data as Tag[];
        });

        this.stringTitle = "Tất cả sản phẩm";
        break;
    };
    this.collectionService.getCollectionAll().subscribe((res: ResponseDto) => {
      this.listCollection = res.data;
      this.listCollection.sort((a, b) => {
        return a.name.length - b.name.length;
      })
    })
  }
  public navigationCollection(id: string) {
    this.router.navigate([`collection/${id}`]).then(() => {
      location.reload();
    })
  }
  public navigation(id: string) {
    if(this.searchFor == "all") {
      this.searchFor = "tag";
    } else if (this.searchFor == "tag") {
      this.searchFor = "category";
    }
    this.router.navigate([`${this.searchFor}/${id}`]).then(() => {
      location.reload();
    })
  }
  public changeSort(e: any) {
    this.sortOption = e.selectedIndex;
    this.pageIndex = 1;
    this.initAll(this.id, this.searchFor);
  }
  public addToCart(id: string) {
    this.communicationService.triggerFunction(id);
  }
  public moveToDetail(id: string) {
    this.router.navigate([`detail/${id}`]);
  }
}
