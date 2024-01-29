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
  private readonly urlGetBestSeller = `Product/new`;
  private readonly urlSearchProduct = `Product/search`;
  private readonly urlGetProductDetail = 'Product/detail';
  private readonly urlGetProductDetailCart = 'Product/detailCart';
  private readonly urlGetProductAll = 'Product/all';
  private readonly urlGetProductCollection = 'Product/collection';
  private readonly urlGetProductCategory = 'Product/category';
  private readonly urlGetProductTag = 'Product/tag';
  private readonly urlGetProductRelative = 'Product/relative'

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
  }  public getProductDetailCart(id: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetProductDetailCart}/${id}`
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
