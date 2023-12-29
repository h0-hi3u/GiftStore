import { HelperReloadSearch } from '../../pipes/helperReloadSearch';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/modules/cartItem';
import { TagService } from 'src/app/core/services/tag.service';
import { Tag } from 'src/app/modules/Tag/tag';
import { ResponseDto } from 'src/app/modules/responseDto';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isHiddenCart: boolean = true;
  cartUser: CartItem[] = JSON.parse(
    localStorage.getItem('cartUser') || JSON.stringify([])
  );
  listTag: Tag[] = [];
  arrUrl: string[] = [];
  constructor(private router : Router, private helperReloadSearch: HelperReloadSearch, private tagService: TagService) {

  }
  ngOnInit(): void {
    this.tagService.getTagAll().subscribe((res: ResponseDto) => {
      this.listTag = res.data;
    });
    this.clearSearchText();
    this.arrUrl = this.router.url.split("/");
  }
 
  public clearSearchText() {
    const searchText = document.getElementById("input-search-text") as HTMLInputElement;
    searchText.value = "";
  }
  public search() {
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
    }
  }
  public backToHome() {
    this.clearSearchText();
    this.router.navigate(["/"]);
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
