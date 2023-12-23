import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router : Router) {

  }
  public search() {
    console.log("search");
  }
  public backToHome() {
    this.router.navigate(["/"]);
  }
}
