import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ProductShowDto } from '../models/Product/productShowDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlGetBestSeller = `Product/new`;
  private urlSearchProduct = `Product/search`;
  private urlGetProductDetail = 'Product/detail';
  private urlGetProductAll = 'Product/all';
  private urlGetProductCollection = 'Product/collection';
  private urlGetProductCategory = 'Product/category';
  private urlGetProductTag = 'Product/tag';
  private urlGetProductRelative = 'Product/relative'

  constructor(private http: HttpClient) {}

  public getNewProduct(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetBestSeller}`
    );
    // https://localhost:7196/api/Product/paging?pageSize=5&pageIndex=1&sortOption=2
  }
  public searchProduct(
    searchText: string,
    pageSize: number,
    pageIndex: number,
  ): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlSearchProduct}?searchText=${searchText}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    );
    // https://localhost:7196/api/Product/paging?searchText=%22g%22&pageSize=5&pageIndex=1&sortOption=0
  }
  public getProductDetail(id: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductDetail}/${id}`
    );
  }
  public getProductAll(pageSize: number, pageIndex: number, sortOption: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductAll}?pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
  }
  public getProductWithTag(id: string, pageSize: number, pageIndex: number, sortOption: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductTag}?id=${id}&pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
  }
  public getProductWithCollection(id: string, pageSize: number, pageIndex: number, sortOption: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductCollection}?id=${id}&pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
  }
  public getProductWithCategory(id: string, pageSize: number, pageIndex: number, sortOption: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductCategory}?id=${id}&pageSize=${pageSize}&pageIndex=${pageIndex}&sortOption=${sortOption}`
    );
  }
  public getProductRelative(id: string, pageSize: number) : Observable<ResponseDto>{
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductRelative}?id=${id}&pageSize=${pageSize}`
    );
  }
}
