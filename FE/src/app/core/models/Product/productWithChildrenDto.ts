import { Category } from "../Category/category";
import { ImageProduct } from "../ImageProduct/imageProduct";
import { Supplier } from "../Supplier/supplier";
import { ProductShowDto } from "./productShowDto";

export interface ProductWithChildrenDto {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variant: string;
    isParent?: boolean;
    description?: string;
    category: Category;
    supplier: Supplier;
    imageProduct: ImageProduct[];
    children: ProductShowDto[];
}