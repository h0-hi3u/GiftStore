import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseDto } from "../models/responseDto";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ProductWithChildrenDto } from "../models/Product/productWithChildrenDto";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private readonly urlReportOrderInMonth = 'Admin/report-order-month';
    private readonly urlReportOrderInYear = 'Admin/report-order-year';
    private readonly urlMonthlySales = 'Admin/monthly-sales';
    private readonly urlMonthlyOrders = 'Admin/monthly-orders';
    private readonly urlBestSeller = 'Admin/best-seller';
    private readonly urlGetFullProduct = 'Admin/all-info-product';
    private readonly urlGetAllParent = 'Admin/all-parent';
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
    public getMonthlySales() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlMonthlySales}`
        );
    }
    public getMonthlyOrders() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlMonthlyOrders}`
        )
    }
    public getBestSeller() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlBestSeller}`
        );
    }
    public getAllInfoProduct(id : string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlGetFullProduct}/${id}`
        )
    }
    public async getAllInfoProduct2(id : string) : Promise<any> {
        let currentProduct : ProductWithChildrenDto = {} as ProductWithChildrenDto;
        var a = await this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlGetFullProduct}/${id}`
        ).toPromise();
        
        return a;
    }
    public getAllParent(): Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlGetAllParent}`
        )
    }
}