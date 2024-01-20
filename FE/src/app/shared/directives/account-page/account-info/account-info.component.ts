import { AuthService } from './../../../../core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  // @Input() name!: string;
  // @Input() email!: string;
  fullName: string = "";
  email: string = "";
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    this.getInfoUser();
  }
  public getInfoUser() {
    const token = localStorage.getItem('access_token') || '';
    let a = this.authService.getInfoToken(token);
    this.fullName = a.name;
    this.email = a.email;
  }
}
