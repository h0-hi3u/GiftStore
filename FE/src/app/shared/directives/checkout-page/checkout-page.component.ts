import { PaymentService } from './../../../core/services/payment.service';
import { HelperValidate } from './../../../core/helpers/helperValidate';
import { ResponseDto } from './../../../core/models/responseDto';
import { OrderService } from './../../../core/services/order.service';
import { AuthService } from './../../../core/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressService } from './../../../core/services/address.service';
import { District } from '../../../core/models/Address/district';
import { HelperNumber } from './../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleUser,
  faCaretLeft,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { Province } from 'src/app/core/models/Address/province';
import { CartItem } from 'src/app/core/models/cartItem';
import { Ward } from 'src/app/core/models/Address/ward';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { OrderCreateRequestDto } from 'src/app/core/models/Order/orderCreateRequestDto';
import { OrderDetailCreateRequestDto } from 'src/app/core/models/Order/orderDetailCreateRequestDto';
import { PaymentMethodDto } from 'src/app/core/models/PaymentMethod/paymentMethodDto';

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
  paymentMethodId: string = '3D4988B2-E8F2-4763-9B7A-7B29281420B6';
  listProvince: Province[] = [];
  listDistrict: District[] = [];
  listWard: Ward[] = [];
  listPaymentMethod: PaymentMethodDto[] = [];
  isLoggedIn: boolean = false;
  isChooseCOD: boolean = true;
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
    private orderService: OrderService,
    private helperValidate: HelperValidate,
    private paymentService: PaymentService,
  ) {}
  ngOnInit(): void {
    this.paymentService.getAll().subscribe((res: ResponseDto) => {
      this.listPaymentMethod = res.data;
      if(this.listPaymentMethod.length > 0) {
        this.paymentMethodId = this.listPaymentMethod[0].id;
      };
    })
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
      phoneNumber: new FormControl('', [Validators.required, this.helperValidate.phoneNumberValidator]),
      address: new FormControl(''),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      note: new FormControl(''),
    });
  }
  public getInfoUser() {
    const token = localStorage.getItem('access_token') || '';
    if(token) {
      let a = this.authService.getInfoToken(token);
      this.fullName = a.name;
      this.email = a.email;
    }
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
    let listDistrictTmp: District[] = [];
    this.addressService.getDistrict().subscribe((res) => {
      listDistrictTmp = res;
      this.listDistrict = listDistrictTmp.filter(item => item.parent_code == code);
    });
    this.listWard = [];
    const p = this.listProvince.filter((value) => {
      return (value.code == code);
    });
    this.nameProvince = p[0].name_with_type;
  }
  public getWard(element: any) {
    const a = element as HTMLSelectElement;
    const code = parseInt(a.value);
    let listWardTmp : Ward[] = [];
    this.addressService.getWard().subscribe((res) => {
      listWardTmp = res;
      this.listWard = listWardTmp.filter(item => item.parent_code == code);
    });
    const d = this.listDistrict.filter((value) => {
      return (value.code == code);
    });
    this.nameDistrict = d[0].name_with_type;
  }
  public setWard(element: any) {
    const a = element as HTMLSelectElement;
    const code = parseInt(a.value);
    const w = this.listWard.filter((value) => {
      return (value.code == code);
    });
    this.nameWard = w[0].name_with_type;
  }
  public chooseCOD(): void {
    const paymentMethod = this.listPaymentMethod.find(item => {
      return item.name == 'COD'
    })
    this.paymentMethodId = paymentMethod?.id || '';
    this.isChooseCOD = true;
    this.isChooseQR = false;
  }
  public chooseQR(): void {
    const paymentMethod = this.listPaymentMethod.find(item => {
      return item.name == 'Momo'
    })
    this.paymentMethodId = paymentMethod?.id || '';
    this.isChooseQR = true;
    this.isChooseCOD = false;
  }
  public submitOrderForm() {
    const address = `${this.nameProvince}, ${this.nameDistrict}, ${this.nameWard}, ${this.getForm.address.value}`;
    const order: OrderCreateRequestDto = {} as OrderCreateRequestDto;
    order.email = this.getForm.email.value;
    order.fullName = this.getForm.fullName.value;
    order.paymentMethodId = this.paymentMethodId;
    order.address = address;
    order.orderDetails = [];
    for(let i = 0; i < this.cartUser.length; i++) {
      let orderDetail: OrderDetailCreateRequestDto = {} as OrderDetailCreateRequestDto;
      orderDetail.productId = this.cartUser[i].id;
      orderDetail.price = this.cartUser[i].price;
      orderDetail.quantity = this.cartUser[i].quantity;
      orderDetail.discount = 0;
      order.orderDetails.push(orderDetail);
    }
    order.note = this.getForm.note.value;
    console.log(order);
    
    this.orderService.createOrderForUser(order).subscribe((res : ResponseDto) => {
      if(res.isSuccess) {
        if(localStorage.getItem('cartUser')) {
          localStorage.removeItem('cartUser');
        }
        if(this.authService.isLoggedIn()) {
          this.router.navigate(['account/orders']);
        } else {
          this.router.navigate(['']);
        }
      } else {
        alert(res.detail);
      }
    })
  }
}
