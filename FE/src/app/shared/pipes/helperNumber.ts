import { Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class HelperNumber {
    public price: number = 123;
    public formatPrice(number : number) : string {
        return number.toLocaleString('en-US') + "₫";
    }
}