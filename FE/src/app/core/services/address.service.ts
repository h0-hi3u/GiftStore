import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Province } from '../models/Address/province';
import { District } from '../models/Address/district';
import { Ward } from '../models/Address/ward';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private readonly urlGetProvince: string = "https://provinces.open-api.vn/api/p/";
    private readonly urlGetDistrict: string = "https://provinces.open-api.vn/api/p/80?depth=3";
    constructor(private http: HttpClient) {}
    
    public getAllProvince(): Observable<Province[]> {
        return this.http.get<Province[]>(
            `../../../assets/address/provinces.json`
        )
    }
    public getDistrict() : Observable<District[]> {
        return this.http.get<District[]>(
            `../../../assets/address/districts.json`
        )
    }
    public getWard() : Observable<Ward[]> {
        return this.http.get<Ward[]>(
            '../../../assets/address/wards.json'
        )
    }
}