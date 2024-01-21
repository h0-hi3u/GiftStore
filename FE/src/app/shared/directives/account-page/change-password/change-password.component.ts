import { AuthService } from './../../../../core/services/auth.service';
import { UserChangePasswordDto } from './../../../../core/models/User/userChangePasswordDto';
import { UserService } from './../../../../core/services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isTruePassword: boolean = true;
  email: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService) {}
  ngOnInit(): void {
      this.email = this.getInfoUser();
  }
  public getInfoUser(): string {
    const token = localStorage.getItem('access_token') || '';
    let a = this.authService.getInfoToken(token);
    return a.email
  }
  changePassForm = this.formBuilder.group({
    password: new FormControl('',[ Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmedPassword: new FormControl('',[Validators.required])
  }, { validators: this.passwordMatchValidator });
  get getForm() {
    return this.changePassForm.controls;
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmedPassword')?.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
  public changePassword() {
    if(this.changePassForm.valid) {
      const userChangePasswordDto: UserChangePasswordDto = {} as UserChangePasswordDto;
      userChangePasswordDto.email = this.email;
      userChangePasswordDto.password = this.getForm.password.value || "";
      userChangePasswordDto.newPassword = this.getForm.newPassword.value || "";
      this.userService.changePassword((userChangePasswordDto)).subscribe((res: ResponseDto) => {
        if(res.isSuccess) {
          location.reload();
        } else if (res.detail == 'Incorrect email or password') {
          this.isTruePassword = false;
        }
      })
    } else {
      this.changePassForm.markAllAsTouched();
    }
  }
}
