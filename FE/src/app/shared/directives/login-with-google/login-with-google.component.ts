import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ResponseDto } from 'src/app/core/models/responseDto';
@Component({
  selector: 'app-login-with-google',
  templateUrl: './login-with-google.component.html',
  styleUrls: ['./login-with-google.component.scss']
})
export class LoginWithGoogleComponent implements OnInit{
  faSpinner = faSpinner;
  isRegisterSuccess = false;
  constructor(private router: Router, private authService: AuthService){}
  ngOnInit(): void {
      const listUrl = this.router.url.split('/');
      const listUrl2 = listUrl[1].split('&');
      const listUrl3 = listUrl2[0].split('=');
      const code = listUrl3[1];
      this.authService.loginWithGoogle(code).subscribe((res: ResponseDto) => {
        if(res.isSuccess && res.detail == 'Check mail and login with password in mail') {
          this.isRegisterSuccess = true;
        } else if (res.isSuccess && res.data != '') {
          localStorage.setItem("access_token", res.data);
          this.router.navigate(['']).then(() => {
            location.reload()
          });
        }
        console.log(res);
      });
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
