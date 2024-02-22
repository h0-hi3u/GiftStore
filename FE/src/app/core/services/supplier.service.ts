import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/responseDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly urlGetAll = 'Supplier/get-all';
  constructor(private http: HttpClient) {}
  public getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(
      `${environment.urlApi}/${this.urlGetAll}`
    );
  }
}