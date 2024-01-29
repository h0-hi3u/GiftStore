import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private readonly urlGetProvince: string = "https://provinces.open-api.vn/api/p/";
    private readonly urlGetDistrict: string = "https://provinces.open-api.vn/api/p/80?depth=3";
    constructor(private http: HttpClient) {}
    public getAllProvince() : Observable<any> {
        return this.http.get<any>(
            `${this.urlGetProvince}`
        )
    }
    public getDistrict(code: number) : Observable<any> {
        return this.http.get<any>(
            `https://provinces.open-api.vn/api/p/${code}?depth=3`
        )
    }
    public getWard(code: number) : Observable<any> {
        return this.http.get<any>(
            `https://provinces.open-api.vn/api/d/${code}?depth=2`
        )
    }
}