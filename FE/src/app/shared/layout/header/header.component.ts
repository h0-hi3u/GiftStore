import { CommunicationService } from './../../../core/services/communication.service';
import { UserCartComponent } from './../../components/user-cart/user-cart.component';
import { HelperReloadSearch } from '../../../core/helpers/helperReloadSearch';
import { Router } from '@angular/router';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  listTag: Tag[] = [];
  arrUrl: string[] = [];
  private triggerSub: Subscription = new Subscription();

  constructor(
    private router : Router,
    private helperReloadSearch: HelperReloadSearch,
    private tagService: TagService,
    private communicationService: CommunicationService) {
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

    this.triggerSub = this.communicationService.triggerFunction$.subscribe((data) => {
      const temp = new String(data).valueOf();
      this.addToCart(temp);
    })
  }
  ngAfterContentChecked(): void {
    if(this.userCartComp) {
      this.cartUser = this.userCartComp.cartUser;
    }
  }
  ngOnDestroy(): void {
      this.triggerSub.unsubscribe();
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
  public login() {
    console.log("Login");
  }
  public register() {
    console.log("Register");
    
  }
  public checkEnter(e : any) {
    if(e.code == "Enter") {
      this.search();
    };
  }
  public addToCart(id: string) {
    this.userCartComp.increaseCart(id);
    this.isHiddenCart = false;
  }
  public backToHome() {
    this.clearSearchText();
    this.router.navigate(["/"]);
  }
  public showAll() {
    console.log("all");
    
  }
  public navigationAll() {
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
}
