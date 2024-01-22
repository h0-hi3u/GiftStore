import { OrderService } from './../../../core/services/order.service';
import { AuthService } from './../../../core/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressService } from './../../../core/services/address.service';
import { District } from './../../../core/models/Addresses/district';
import { HelperNumber } from './../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleUser,
  faCaretLeft,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { Province } from 'src/app/core/models/Addresses/province';
import { CartItem } from 'src/app/core/models/cartItem';
import { Ward } from 'src/app/core/models/Addresses/ward';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  faCircleUser = faCircleUser;
  faCaretLeft = faCaretLeft;
  faHeart = faHeart;
  faMoneyBill = faMoneyBill;
  cartUser: CartItem[] = JSON.parse(
    localStorage.getItem('cartUser') || JSON.stringify([])
  );
  totalPrice: number =
    this.cartUser.reduce((total, current) => {
      return total + current.price * current.quantity;
    }, 0) || 0;
  totalProduct: number =
    this.cartUser.reduce((total, current) => {
      return total + current.quantity;
    }, 0) || 0;

  listProvince: Province[] = [];
  listDistrict: District[] = [];
  listWard: Ward[] = [];
  isLoggedIn: boolean = false;
  isChooseCOD: boolean = false;
  isChooseQR: boolean = false;
  email: string = '';
  fullName: string = '';
  orderForm: any;
  nameProvince: string = '';
  nameDistrict: string = '';
  nameWard: string = '';
  constructor(
    private router: Router,
    public helperNumber: HelperNumber,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.getInfoUser();
    this.addressService.getAllProvince().subscribe((res) => {
      this.listProvince = res;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.orderForm = this.formBuilder.group({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
      fullName: new FormControl(this.fullName, [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      note: new FormControl(''),
    });
  }
  public getInfoUser() {
    const token = localStorage.getItem('access_token') || '';
    let a = this.authService.getInfoToken(token);
    this.fullName = a.name;
    this.email = a.email;
  }
  get getForm() {
    return this.orderForm.controls;
  }

  public backToHome() {
    this.router.navigate(['/']);
  }
  public backToCart() {
    this.router.navigate(['cart']);
  }
  public getDistrict(element: any) {
    const a = element as HTMLSelectElement;
    const code = parseInt(a.value);

    this.addressService.getDistrict(code).subscribe((res) => {
      this.listDistrict = res.districts;
    });
    this.listWard = [];
    const p = this.listProvince.filter((value) => {
      return (value.code == code);
    });
    this.nameProvince = p[0].name;
  }
  public getWard(element: any) {
    const a = element as HTMLSelectElement;
    const code = parseInt(a.value);

    this.addressService.getWard(code).subscribe((res) => {
      this.listWard = res.wards;
    });
    const d = this.listDistrict.filter((value) => {
      return (value.code == code);
    });
    this.nameDistrict = d[0].name;
  }
  public setWard(element: any) {
    const a = element as HTMLSelectElement;
    const code = parseInt(a.value);
    const w = this.listWard.filter((value) => {
      return (value.code == code);
    });
    this.nameWard = w[0].name;
  }
  public chooseCOD(): void {
    this.isChooseCOD = true;
    this.isChooseQR = false;
  }
  public chooseQR(): void {
    this.isChooseQR = true;
    this.isChooseCOD = false;
  }
  public submitForm() {
    const address = `${this.nameProvince}, ${this.nameDistrict}, ${this.nameWard}, ${this.getForm.address.value}`;
    console.log(address);
  }
}
