import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDto } from 'src/app/core/models/User/userLoginDto';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  errLogin: string = '';
  isError: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public goToRegister(): void {
    this.router.navigate(['register']);
  }
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get getForm() {
    return this.loginForm.controls;
  }
  public submit() {
    if (this.loginForm.valid) {
      const user: UserLoginDto = { email: this.getForm.email.value || '', password: this.getForm.password.value || ''};
      this.authService.login(user).subscribe((res: ResponseDto) => {
        if(res.isSuccess) {
          localStorage.setItem("access_token", res.data);
          this.router.navigate(['']).then(() => {
            location.reload()
          });
        } else {
          this.errLogin = res.detail;
          this.isError = true;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
