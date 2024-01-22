import { PaymentMethodDto } from "../PaymentMethod/paymentMethodDto";

export interface OrderShowResponseDto {
    id: string,
    timeCreate: string,
    orderStatus: number,
    paymentMethod: PaymentMethodDto,
    totalPrice: number,
    address: string,
}