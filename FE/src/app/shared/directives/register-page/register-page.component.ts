import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private router: Router, private formBuilder: FormBuilder) {}
  registerForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.required, Validators.pattern('^0\d[0-9]$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  }); 
  get getForm() {
    return this.registerForm.controls;
  }
  public register() {
    console.log(this.registerForm.controls.phoneNumber.errors);
    
    if (this.registerForm.valid) {
      // const user: UserLoginDto = { email: this.getForm.email.value || '', password: this.getForm.password.value || ''};
      // this.authService.login(user).subscribe((res: ResponseDto) => {
      //   if(res.isSuccess) {
      //     localStorage.setItem("access_token", res.data);
      //     this.router.navigate(['']);
      //   } else {
      //     this.errLogin = res.detail;
      //     this.isError = true;
      //   }
      // });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  public goToLogin(): void {
    this.router.navigate(['login']);
  }
}
