using GiftStore.DAL.Model.Dto.PaymentMethod;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Model.Dto.Order;

public class OrderShowResponse
{
    public Guid Id { get; set; }
    public DateTime TimeCreate { get; set; }
    public int OrderStatus { get; set; }
    public PaymentMethodShowResponseDto PaymentMethod { get; set; }
    public string Address { get; set; }
    public double TotalPrice { get; set; }
}
