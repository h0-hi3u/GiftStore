import { UserChangePasswordDto } from './../models/User/userChangePasswordDto';
import { UserRegisterDto } from './../models/User/userRegisterDto';
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
    urlRegister = 'User/register';
    urlChangePassword = 'User/change-password';
    constructor(private http: HttpClient){}

    public checkEmail(email: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlCheckEmail}?email=${email}`
        )
    }
    public register(userRegisterDto: UserRegisterDto) : Observable<ResponseDto> {
        return this.http.post<ResponseDto>(
            `${environment.urlApi}/${this.urlRegister}`, userRegisterDto
        )
    }

    public changePassword(userChangePasswordDto: UserChangePasswordDto) : Observable<ResponseDto> {
        return this.http.post<ResponseDto>(
            `${environment.urlApi}/${this.urlChangePassword}`, userChangePasswordDto
        )
    }
}