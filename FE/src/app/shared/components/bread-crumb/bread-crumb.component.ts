import { CategoryService } from './../../../core/services/category.service';
import { TagService } from './../../../core/services/tag.service';
import { CollectionService } from './../../../core/services/collection.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  arrUrl: string[] = [];
  searchFor: string = '';
  stringShow: string = '';
  id: string = '';

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private tagService: TagService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.arrUrl = this.router.url.split('/');
    this.searchFor = this.arrUrl[1];
    this.id = this.arrUrl[2] || '';
    this.initAll(this.id, this.searchFor);
  }
  public initAll(id: string, searchFor: string) {
    switch (searchFor) {
      case 'collection':
        this.collectionService
          .getCollectionDetail(id)
          .subscribe((res: ResponseDto) => {
            this.stringShow = res.data.name;
          });
        break;
      case 'tag':
        this.tagService.getTagDetail(id).subscribe((res: ResponseDto) => {
          this.stringShow = res.data.name;
        });
        break;
      case 'category':
        this.categoryService
          .getCategoryDetail(id)
          .subscribe((res: ResponseDto) => {
            this.stringShow = res.data.name;
          });
        break;
      case 'search':
        this.stringShow = 'Tìm kiếm';
        break;
      case 'cart':
        this.stringShow = 'Giỏ hàng';
        break;
        case 'login':
          this.stringShow = 'Đăng nhập';
          break;
          case 'register':
            this.stringShow = 'Đăng kí';
            break;
      default:
        this.stringShow = 'Tất cả sản phẩm';
        break;
    }
  }
}
