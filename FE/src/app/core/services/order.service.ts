import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/responseDto';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private urlOrdersOfUser = 'api/Order/';
    constructor(private http: HttpClient){}

    public getOrdersOfUser(email: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
          `${environment.urlApi}/${this.urlOrdersOfUser}/${email}`  
        );
    }
}