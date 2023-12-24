import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchText : string = "";
  constructor(private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.searchProduct();
    console.log("init");
  }
  public searchProduct() {
    const inputSearchText = document.getElementById("input-search-text") as HTMLInputElement;
    this.searchText = this.route.snapshot.paramMap.get("searchText") || inputSearchText.value;
    console.log("searchText: " + this.searchText);
  }
}
