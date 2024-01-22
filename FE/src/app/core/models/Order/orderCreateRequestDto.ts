import { OrderDetailCreateRequestDto } from "./orderDetailCreateRequestDto";

export interface OrderCreateRequestDto {
        
    // public Guid? UserId { get; set; }
    // public Guid PaymentMethodId { get; set; }
    // public string Address { get; set; }
    // public double TotalPrice { get; set; }
    // public virtual ICollection<OrderDetailCreateDto> OrderDetails { get; set; }
    userId: string,
    paymentMethodId: string,
    address: string,
    orderDetail: OrderDetailCreateRequestDto[]
}