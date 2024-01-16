using GiftStore.DAL.Model.Dto.Product;

namespace GiftStore.DAL.Model.Dto.OrderDetail;

public class OrderDetailShowResponseDto
{
    public Guid Id { get; set; }
    public ProductShowOrderDetailDto Product { get; set; }
    public double Price { get; set; }
    public Guid OrderId { get; set; }
    public int Quantity { get; set; }
    public double? Discount { get; set; }
}
