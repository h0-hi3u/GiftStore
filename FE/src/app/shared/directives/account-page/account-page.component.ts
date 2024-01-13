import { AuthService } from './../../../core/services/auth.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  urlString: string = '';
  arrUrl: string[] = [];
  fullName: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.arrUrl = this.router.url.split('/');
    this.urlString = this.arrUrl[this.arrUrl.length - 1];
    this.getInfoUser();
  }
  public getInfoUser() {
    const token = localStorage.getItem('access_token') || '';
    let a = this.authService.getInfoToken(token);
    this.fullName = a.name;
  }
  public goToInfo(): void {
    this.router.navigate(['account']);
    this.urlString = 'account';
  }
  public goToOrders(): void {
    this.router.navigate(['account/orders']);
    this.urlString = 'orders';
  }
  public goToChangePassword(): void {
    this.router.navigate(['account/change-password']);
    this.urlString = 'change-password';
  }
  public goToAddresses(): void {
    this.router.navigate(['account/addresses']);
    this.urlString = 'addresses';
  }
  public goToLogout(): void {
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
    }
    this.router.navigate(['']);
  }
}
