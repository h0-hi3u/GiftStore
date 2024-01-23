import { OrderDetailCreateRequestDto } from "./orderDetailCreateRequestDto";

export interface OrderCreateRequestDto {
    email: string;
    fullName: string,
    paymentMethodId: string,
    address: string,
    orderDetails: OrderDetailCreateRequestDto[],
    note: string,
}