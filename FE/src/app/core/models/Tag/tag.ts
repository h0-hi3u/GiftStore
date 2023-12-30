import { Category } from "../Category/category";

export interface Tag{
    id: string;
    name: string;
    description?: string;
    category: Category[];
}