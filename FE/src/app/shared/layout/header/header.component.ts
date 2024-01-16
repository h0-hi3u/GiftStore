import { AuthService } from './../../../core/services/auth.service';
import { CommunicationService } from './../../../core/services/communication.service';
import { UserCartComponent } from './../../components/user-cart/user-cart.component';
import { HelperReloadSearch } from '../../../core/helpers/helperReloadSearch';
import { Router } from '@angular/router';
import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartItem } from 'src/app/core/models/cartItem';
import { TagService } from 'src/app/core/services/tag.service';
import { Tag } from 'src/app/core/models/Tag/tag';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked, OnDestroy{

  @ViewChild(UserCartComponent) userCartComp!: UserCartComponent;

  isHiddenCart: boolean = true;
  // cartUser: CartItem[] = JSON.parse(
  //   localStorage.getItem('cartUser') || JSON.stringify([])
  // );
  cartUser: CartItem[] = [];
  totalProduct: number  = 0;
  listTag: Tag[] = [];
  arrUrl: string[] = [];
  isLoggedIn: boolean = false;
  private triggerSub: Subscription = new Subscription();
  private triggerSubChangeNumber: Subscription = new Subscription();
  private triggerDecreaseCart: Subscription = new Subscription();
  private triggerIncreaseCart: Subscription = new Subscription();
  private triggerRemoveFromCart: Subscription = new Subscription();
  private triggerChangeQuantity: Subscription = new Subscription();
  constructor(
    private router : Router,
    private helperReloadSearch: HelperReloadSearch,
    private tagService: TagService,
    private communicationService: CommunicationService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.tagService.getTagAll().subscribe((res: ResponseDto) => {
      this.listTag = res.data;
      this.listTag.sort((a, b) => {
        return a.name.length - b.name.length;
      })
    });
    this.clearSearchText();
    this.arrUrl = this.router.url.split("/");
    this.addTrigger();
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  ngAfterContentChecked(): void {
    if(this.userCartComp) {
      this.cartUser = this.userCartComp.cartUser;
      this.totalProduct = this.cartUser.reduce((total, current) => {
        return total + current.quantity;
      }, 0) || 0;
    }
  }
  ngOnDestroy(): void {
      this.triggerSub.unsubscribe();
      this.triggerSubChangeNumber.unsubscribe();
      this.triggerDecreaseCart.unsubscribe();
      this.triggerIncreaseCart.unsubscribe();
      this.triggerRemoveFromCart.unsubscribe();
      this.triggerChangeQuantity.unsubscribe();
  }
  public clearSearchText(): void {
    const searchText = document.getElementById("input-search-text") as HTMLInputElement;
    searchText.value = "";
  }
  public search(): void {
    const inputSearchText = document.getElementById(
      'input-search-text'
    ) as HTMLInputElement;
    this.helperReloadSearch.searchText = inputSearchText.value || "";
      if(!this.router.url.includes("search")) {
        this.router.navigate(["/search"],);
      } else{
        this.helperReloadSearch.triggerReload();
      }
  }
  public checkEnter(e : any) {
    if(e.code == "Enter") {
      this.search();
    };
  }
  //#region handle cart
  private addTrigger() {
    this.triggerSub = this.communicationService.triggerFunction$.subscribe((data) => {
      const id = new String(data).valueOf();
      this.addToCart(id);
    });
    this.triggerSubChangeNumber = this.communicationService.triggerFunctionChangNumber$.subscribe((data) => {
      this.addManyToCart(data);
    });
    this.triggerDecreaseCart = this.communicationService.triggerDecreaseCart$.subscribe((data) => {
      const id = new String(data).valueOf();
      this.decreaseCart(id);
    });
    this.triggerIncreaseCart = this.communicationService.triggerIncreaseCart$.subscribe((data) => {
      const id = new String(data).valueOf();
      this.increaseCart(id);
    });
    this.triggerRemoveFromCart = this.communicationService.triggerRemoveFromCart$.subscribe((data) => {
      const id = new String(data).valueOf();
      this.removeFromCart(id);
    });
    this.triggerChangeQuantity = this.communicationService.triggerChangeQuantity$.subscribe((data) => {
      this.changeQuantity(data);
    });
  }

  public addToCart(id: string) {
    this.userCartComp.increaseCart(id);
    this.isHiddenCart = false;
  }
  public addManyToCart(data: any) {
    this.userCartComp.addManyToCart(data);
    this.isHiddenCart = false;
  }
  public decreaseCart(id: string) {
    this.userCartComp.decreaseCart(id);
  }
  public increaseCart(id: string) {
    this.userCartComp.increaseCart(id);
  }
  public removeFromCart(id: string) {
    this.userCartComp.removeFromCart(id);
  }
  public changeQuantity(data: any) {
    this.userCartComp.changQuantity(data.id, data.element);
  }
  //#endregion
  public backToHome() {
    this.arrUrl[1] = '';
    this.clearSearchText();
    this.router.navigate(["/"]);
  }
  public showAll() {
    console.log("all");
    
  }
  public navigationAll() {
    this.arrUrl[1] = 'all';
    this.router.navigate(["all"]).then(() => {
      location.reload();
    });
  }
  public navigationTag(id: string) {
    this.router.navigate([`tag/${id}`]).then(() => {
      location.reload();
    });
  }
  public navigationCategory(id: string) {
    this.router.navigate([`category/${id}`]).then(() => {
      location.reload();
    });
  }
  public goToLogin(): void {
    this.router.navigate(['login']);
  }
  public goToRegister(): void {
    this.router.navigate(['register']);
  }
  public logout() {
    if(localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
    }
    this.router.navigate(['']);
  }
  public goToProfile() {
    this.router.navigate(['account']).then(() => {
      location.reload();
    });
  }
}
