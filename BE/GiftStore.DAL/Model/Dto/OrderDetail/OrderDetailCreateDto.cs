namespace GiftStore.DAL.Model.Dto.OrderDetail;

public class OrderDetailCreateDto
{
    public Guid ProductId { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public double? Discount { get; set; }
}
