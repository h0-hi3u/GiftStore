import { ProductShowDto } from "../Product/productShowDto";

export interface ImageProduct {
    image: string;
    productId: string;
    product: ProductShowDto;
}