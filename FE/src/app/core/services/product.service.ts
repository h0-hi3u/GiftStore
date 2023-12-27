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
  private urlSearchProduct = `Product/search`;
  private urlGetProductDetail = 'Product/detail';

  constructor(private http: HttpClient) {}

  public getNewProduct(pageSize: number, pageIndex: number, sortOption: number) : Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetWithPaging}?pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
    // https://localhost:7196/api/Product/paging?pageSize=5&pageIndex=1&sortOption=2
  }
  public searchProduct(searchText: string, pageSize: number, pageIndex: number, sortOption: number) : Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlSearchProduct}?searchText=${searchText}&pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
   // https://localhost:7196/api/Product/paging?searchText=%22g%22&pageSize=5&pageIndex=1&sortOption=0
  }
  public getProductDetail(id: string) : Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductDetail}?id=${id}`
    );
  }
}
