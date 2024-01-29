import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseDto } from "../models/responseDto";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private readonly urlReportOrderInMonth = 'Admin/report-order-month';
    private readonly urlReportOrderInYear = 'Admin/report-order-year';

    constructor(private http: HttpClient) {}

    public reportOrderInMonth() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlReportOrderInMonth}`
        );
    }
    public reportOrderInYear(): Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlReportOrderInYear}`
        );
    }
}