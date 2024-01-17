import { ProductShowDto } from "../Product/productShowDto";

export interface OrderDetailShowDto {
    id: string,
    product: ProductShowDto,
    price: number,
    orderId: string,
    quantity: number,
    discount: number
}