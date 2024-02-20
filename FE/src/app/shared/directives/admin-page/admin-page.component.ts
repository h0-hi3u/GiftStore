import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  currentTab: string = "admin";
  constructor(private router: Router) {}
  ngOnInit(): void {
    const listUrl = this.router.url.split('/');
    this.currentTab = listUrl[listUrl.length - 1];
  }
  public goToDashboard(): void {
    this.currentTab = "admin";
    this.router.navigate(['/admin']);
  }
  public goToProduct(): void {
    this.currentTab = "product";
    this.router.navigate(['/admin/product']);
  }
}
