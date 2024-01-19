import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDto } from "../models/responseDto";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    urlCheckEmail = 'User/check-email';
    urlCheckPhone = 'User/check-phone';

    constructor(private http: HttpClient){}
    public checkEmail(email: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlCheckEmail}?email=${email}`
        )
    }
    public checkPhone(phone: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlCheckPhone}?phone=${phone}`
        )
    }
}