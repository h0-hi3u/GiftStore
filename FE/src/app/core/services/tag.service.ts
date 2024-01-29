import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDto } from "src/app/core/models/responseDto";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: "root"
})
export class TagService {
    private readonly urlTagAll = "Tag/all";
    private readonly urlDetail = "Tag/detail";

    constructor(private http: HttpClient) {}

    public getTagAll() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlTagAll}`
        );
    }
    public getTagDetail(id: string) : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlDetail}/${id}`
        )
    }
}