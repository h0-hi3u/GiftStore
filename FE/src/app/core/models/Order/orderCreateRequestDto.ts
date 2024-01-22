import { OrderDetailCreateRequestDto } from "./orderDetailCreateRequestDto";

export interface OrderCreateRequestDto {
    email: string;
    fullName: string,
    paymentMethodId: string,
    address: string,
    orderDetail: OrderDetailCreateRequestDto[],
    note: string,
}