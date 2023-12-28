import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDto } from "src/app/modules/responseDto";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: "root"
})
export class TagService {
    private urlTagAll = "Tag/all"
    constructor(private http: HttpClient) {}

    public getTagAll() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlTagAll}`
        );
    }
}