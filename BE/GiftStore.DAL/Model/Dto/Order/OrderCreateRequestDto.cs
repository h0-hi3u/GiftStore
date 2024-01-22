using GiftStore.DAL.Model.Dto.OrderDetail;

namespace GiftStore.DAL.Model.Dto.Order;

public class OrderCreateRequestDto
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public Guid PaymentMethodId { get; set; }
    public string Address { get; set; }
    public virtual ICollection<OrderDetailCreateDto> OrderDetails { get; set; }
    public string? Note { get; set; }
}
