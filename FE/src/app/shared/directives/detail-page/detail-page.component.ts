import { CommunicationService } from './../../../core/services/communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperNumber } from './../../../core/helpers/helperNumber';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { ProductService } from 'src/app/core/services/product.service';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { ImageProduct } from 'src/app/core/models/ImageProduct/imageProduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  slideIndex: number = 0;
  listProduct: ProductShowDto[] = [];
  listImage: ImageProduct[] = [];
  listIndex: number[] = [];
  count: number = 0;
  srcCurrent: string = '';
  indexCurrentImage: number = 0;
  currentProduct: ProductShowDto = {} as ProductShowDto;
  listProductRelative: ProductShowDto[] = [];
  currentChoose: number = 0;
  private reloadSub: Subscription = new Subscription();

  constructor(
    public helperNumber: HelperNumber,
    private productService: ProductService,
    private router: Router,
    private communicationService: CommunicationService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const arrUrl = this.router.url.split('/');
    this.init(arrUrl[2]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id) {
        this.reloadData(id);
      }
    })
  }
  public reloadData(id: string) {
    this.init(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnDestroy(): void {
    this.reloadSub.unsubscribe();
  }
  public init(id: string) {
    this.clearData();
    this.productService
      .getProductDetail(id)
      .subscribe((res: ResponseDto) => {
        this.listProduct = res.data;
        this.listIndex = [];
        for (let i = 0; i < this.listProduct.length; i++) {
          this.listIndex.push(this.count);
          for (let j = 0; j < this.listProduct[i].imageProduct.length; j++) {
            this.listImage.push(this.listProduct[i].imageProduct[j]);
            this.count++;
          }
        }
        this.showDiv(0);
        this.chooseVariant(0);
      });
    this.productService.getProductRelative(id, 4).subscribe((res: ResponseDto) => {
      this.listProductRelative = res.data;
    })
  }
  public clearData() {
    this.slideIndex = 0;
    this.listProduct = [];
    this.listImage = [];
    this.listIndex = [];
    this.count = 0;
    this.srcCurrent = '';
    this.indexCurrentImage = 0;
    this.currentProduct = {} as ProductShowDto;
    this.listProductRelative = [];
    this.currentChoose = 0;
  }
  //#region slide image
  public currentDiv(n: number) {
    this.showDiv((this.slideIndex = n));
  }
  public showDiv(n: number) {
    if (this.listImage.length > 0) {
      this.srcCurrent = this.listImage[n].image;
      this.indexCurrentImage = n;
    }
  }
  //#endregion
  public chooseVariant(n: number) {
    this.currentDiv(this.listIndex[n]);
    this.currentChoose = n;
    this.currentProduct = this.listProduct[n];
  }
  public addToCart(id: string) {
    this.communicationService.triggerFunction(id);
  }
  public moveToDetail(id: string) {
    this.router.navigate([`detail/${id}`]);
  }
}
