import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  urlString: string = "";
  arrUrl: string[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.loadUrl();
    this.urlString = 'account';
  }
  // public loadUrl() {
  //   this.arrUrl = this.router.url.split("/");
  //   this.urlString = this.arrUrl[this.arrUrl.length - 1];
  //   console.log(this.urlString);
  // }
  public goToInfo() : void {
    this.router.navigate(['account']);
    this.urlString = 'account';
  }
  public goToOrders() : void {
    this.router.navigate(['account/orders']);
    this.urlString = 'orders';
  }
  public goToChangePassword() : void {
    this.router.navigate(['account/change-password']);
    this.urlString = 'change-password';
  }
  public goToAddresses(): void {
    this.router.navigate(['account/addresses']);
    this.urlString = 'addresses';
  }
}
