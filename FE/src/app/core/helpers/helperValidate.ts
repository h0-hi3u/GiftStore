import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HelperValidate {
    
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
}