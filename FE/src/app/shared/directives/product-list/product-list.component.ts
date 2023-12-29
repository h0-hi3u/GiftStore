import { CategoryService } from './../../../core/services/category.service';
import { HelperNumber } from './../../pipes/helperNumber';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from 'src/app/core/services/collection.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TagService } from 'src/app/core/services/tag.service';
import { Category } from 'src/app/modules/Category/category';
import { Collection } from 'src/app/modules/Collection/collection';
import { ProductShowDto } from 'src/app/modules/Product/productShowDto';
import { Tag } from 'src/app/modules/Tag/tag';
import { ResponseDto } from 'src/app/modules/responseDto';

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

  constructor(
    private router: Router,
    private productService: ProductService,
    public helperNumber: HelperNumber,
    private collectionService: CollectionService,
    private tagService: TagService,
    private categoryService: CategoryService ) {
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
        this.productService.getProductWithCollection(id, 9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        this.collectionService.getCollectionDetail(id).subscribe((res: ResponseDto) => {
          this.stringTitle = res.data.name;
        })
        break;
      case "tag":
        this.productService.getProductWithTag(id, 9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        this.tagService.getTagDetail(id).subscribe((res: ResponseDto) => {
          this.listCategorySort = res.data.category as Category[];
        })
        this.tagService.getTagDetail(id).subscribe((res: ResponseDto) => {
          this.stringTitle = res.data.name;
        })
        break;
      case "category":
        this.productService.getProductWithCategory(id, 9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        this.categoryService.getCategoryDetail(id).subscribe((res: ResponseDto) => {
          this.stringTitle = res.data.name;
        })
        break;
      default:
        this.productService.getProductAll(9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        this.tagService.getTagAll().subscribe((res: ResponseDto) => {
          this.listCategorySort = res.data as Tag[];
        });
        this.stringTitle = "Tất cả sản phẩm";
        break;
    }
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
}
