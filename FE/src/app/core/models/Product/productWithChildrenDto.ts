import { ImageProduct } from "../ImageProduct/imageProduct";
import { ProductShowDto } from "./productShowDto";

export interface ProductWithChildrenDto {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variant: string;
    isParent?: boolean;
    description?: string;
    imageProduct: ImageProduct[];
    children: ProductShowDto[];
}