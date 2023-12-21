import { ImageProduct } from "../ImageProduct/imageProduct";

export class ProductShowDto {
    // public Guid Id { get; set; }
    // public string Name { get; set; }
    // public double Price { get; set; }
    // public int Quantity { get; set; }
    // public string Variant { get; set; }
    // public DateTime CreateDate { get; set; }
    // public Guid? ParentId { get; set; }
    // public bool IsParent { get; set; }
    // public Guid CategoryId { get; set; }
    // public Guid SupplierId { get; set; }
    // public string? Description { get; set; }
    id: string = '';
    name: string = '';
    price: number = 0;
    quantity: number = 0;
    variant: string = '';
    isParent?: boolean;
    description?: string;
    productImage: ImageProduct[] = [];
}