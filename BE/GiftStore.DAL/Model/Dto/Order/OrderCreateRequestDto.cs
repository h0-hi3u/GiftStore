using GiftStore.DAL.Model.Dto.OrderDetail;

namespace GiftStore.DAL.Model.Dto.Order;

public class OrderCreateRequestDto
{
    public Guid? UserId { get; set; }
    public Guid PaymentMethodId { get; set; }
    public string Address { get; set; }
    public virtual ICollection<OrderDetailCreateDto> OrderDetails { get; set; }
}
