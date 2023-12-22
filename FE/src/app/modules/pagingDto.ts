import { ProductShowDto } from "./Product/productShowDto";

export interface PagingDto {
    data: ProductShowDto[];
    totalRecords: number;
}