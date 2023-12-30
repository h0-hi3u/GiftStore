import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ResponseDto } from "src/app/core/models/responseDto";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    private readonly urlDetail = "Category/detail";
    
    constructor(private http: HttpClient){}
    public getCategoryDetail(id: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlDetail}/${id}`
        )
    }
}