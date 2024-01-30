import { Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class HelperNumber {
    public formatNumber(number : number) : string {
        return (number.toLocaleString('en-US')).replaceAll(",", ".");
    }
    public formatPrice(number : number) : string {
        return (number.toLocaleString('en-US') + "₫").replaceAll(",", ".");
    }
    public formatDiscount(number : number) : string {
        return number + "%";
    }
}