using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Model.Dto.Order;

public class OrderShowResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime TimeCreate { get; set; }
    public int OrderStatus { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public double TotalPrice { get; set; }
}
