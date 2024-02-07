import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor(private router: Router) {}
  public goToDashboard(): void {
    this.router.navigate(['/admin']);
  }
  public goToProduct(): void {
    this.router.navigate(['/admin/product']);
  } 
}
