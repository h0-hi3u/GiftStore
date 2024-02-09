import { ProductShowDto } from "../Product/productShowDto";

export interface BestSellerDto {
    id: string,
    numberSold: number,
    totalPriceSold: number,
    productId: string,
    product: ProductShowDto,
}