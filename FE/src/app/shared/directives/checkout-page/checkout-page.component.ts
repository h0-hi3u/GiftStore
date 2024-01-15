import { AddressService } from './../../../core/services/address.service';
import { District } from './../../../core/models/Addresses/district';
import { HelperNumber } from './../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleUser, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Province } from 'src/app/core/models/Addresses/province';
import { CartItem } from 'src/app/core/models/cartItem';
import { Ward } from 'src/app/core/models/Addresses/ward';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  faCircleUser = faCircleUser;
  faCaretLeft = faCaretLeft;
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

  constructor(
    private router: Router,
    public helperNumber: HelperNumber,
    private addressService: AddressService
  ) {}
  ngOnInit(): void {
    this.addressService.getAllProvince().subscribe(res => {
      this.listProvince = res;
    })
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
    this.addressService.getDistrict(code).subscribe(res => {
      this.listDistrict = res.districts;
    })
    this.listWard = [];
  }
  public getWard(element: any) {
    const a = element as HTMLSelectElement;
    const code = parseInt(a.value);
    this.addressService.getWard(code).subscribe(res => {
      this.listWard = res.wards;
    })
  }
}
