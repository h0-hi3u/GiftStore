import { UserService } from './../../../core/services/user.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  isEmailNotExist: boolean = true;
  isPhoneNotExist: boolean = true;
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {}
  registerForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, this.phoneNumberValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  }); 
  get getForm() {
    return this.registerForm.controls;
  }
  public phoneNumberValidator(control: any) {
    const phoneNumber = control.value;
    if (phoneNumber && phoneNumber.charAt(0) !== '0') {
      return { invalidStart: true };
    }
    if (phoneNumber && phoneNumber.length !== 10) {
      return { invalidLength: true };
    }
    return null;
  }
  public register() {
    console.log(this.registerForm.controls.phoneNumber.errors);
    
    if (this.registerForm.valid) {
      console.log("valid");
    } else {
      console.log('invalid');
      this.registerForm.markAllAsTouched();
    }
  }
  public goToLogin(): void {
    this.router.navigate(['login']);
  }
  public checkEmailExist(element: any) {
    const elementInput = element as HTMLInputElement;
    const value = elementInput.value == "" ? "a" : elementInput.value;
    this.userService.checkEmail(value).subscribe((res: ResponseDto) => {
      this.isEmailNotExist = res.data;
    })
  }
  public checkPhoneExist(element: any) {
    const elementInput = element as HTMLInputElement;
    const value = elementInput.value == "" ? "a" : elementInput.value;
    this.userService.checkEmail(value).subscribe((res: ResponseDto) => {
      this.isPhoneNotExist = res.data;
    })
  }
}
