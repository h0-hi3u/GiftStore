import { Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class HelperNumber {
    public formatPrice(number : number) : string {
        return (number.toLocaleString('en-US') + "₫").replaceAll(",", ".");
    }
}