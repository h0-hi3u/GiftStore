import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/modules/responseDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlGetWithPaging = `Product/paging`;

  constructor(private http: HttpClient) {}

  public getNewProduct(pageSize: number, pageIndex: number, sortOption: number) : Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetWithPaging}?pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
    // https://localhost:7196/api/Product/paging?pageSize=5&pageIndex=1&sortOption=2
  }
}
