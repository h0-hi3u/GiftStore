import { ImageProduct } from "../ImageProduct/imageProduct";

export interface ProductParentCreateDto {
    name: string,
    price: number,
    quantity: number,
    variant: string,
    categoryId: string,
    supplierId: string,
    description: string,
    imageProduct: ImageProduct[],
}