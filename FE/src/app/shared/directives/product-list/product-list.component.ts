import { HelperNumber } from './../../pipes/helperNumber';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from 'src/app/core/services/collection.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Collection } from 'src/app/modules/Collection/collection';
import { ProductShowDto } from 'src/app/modules/Product/productShowDto';
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
  constructor(
    private router: Router,
    private productService: ProductService,
    public helperNumber: HelperNumber,
    private collectionService: CollectionService ) {
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
        break;
      case "tag":
        this.productService.getProductWithTag(id, 9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        break;
      case "category":
        this.productService.getProductWithCategory(id, 9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        break;
      default:
        this.productService.getProductAll(9, 1, 1).subscribe((res:ResponseDto) => {
          this.listProduct = res.data.data;
        });
        break;
    }
    this.collectionService.GetCollectionAll().subscribe((res: ResponseDto) => {
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
}
