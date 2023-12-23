import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private router : Router) {
  }
  ngOnInit(): void {
  }
  public clearSearchText() {
    const searchText = document.getElementById("input-search-text") as HTMLInputElement;
    searchText.value = "";
  }
  public search() {
    const searchText = document.getElementById("input-search-text") as HTMLInputElement;
    if(searchText) {
      this.router.navigate(["/search", {searchText: `${searchText.value}`}],);
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
