import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ResponseDto } from "src/app/modules/responseDto";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: "root"
})
export class CollectionService {
    private urlCollectionAll = "Collection/all";

    constructor(private http: HttpClient) {}

    public GetCollectionAll() : Observable<ResponseDto> {
        return this.http.get<ResponseDto>(
            `${environment.urlApi}/${this.urlCollectionAll}`
        )
    }
}