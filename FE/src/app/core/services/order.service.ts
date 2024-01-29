import { OrderCreateRequestDto } from './../models/Order/orderCreateRequestDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/responseDto';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private readonly urlOrdersOfUser = 'Order';
    private readonly urlOrderDetail = 'Order/detail';
    private readonly urlCreateOrderUser = 'Order/create-user';
    constructor(private http: HttpClient){}

    public getOrdersOfUser(email: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
          `${environment.urlApi}/${this.urlOrdersOfUser}/${email}`  
        );
    }
    public getOrderDetail(id: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlOrderDetail}/${id}`
        );
    }
    public createOrderForUser(orderCreateRequestDto: OrderCreateRequestDto) : Observable<ResponseDto> {
        return this.http.post<ResponseDto>(
            `${environment.urlApi}/${this.urlCreateOrderUser}`, orderCreateRequestDto
        );
    }
}