import { HelperReloadSearch } from '../../pipes/helperReloadSearch';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private router : Router, private helperReloadSearch: HelperReloadSearch) {
  }
  ngOnInit(): void {
    this.clearSearchText();
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
}
