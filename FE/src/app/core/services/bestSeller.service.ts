import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDto } from "../models/responseDto";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class BestSellerService {
    private readonly urlGet = 'BestSeller/all';
    constructor(private http : HttpClient) {}
    public GetAll() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlGet}`
        )
    }
}