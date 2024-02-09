using GiftStore.DAL.Model.Dto.Product;

namespace GiftStore.DAL.Model.Dto.BestSeller;

public class BestSellerShowResponseDto
{
    public Guid Id { get; set; }
    public int NumberSold { get; set; }
    public double TotalPriceSold { get; set; }
    public Guid ProductId { get; set; }
    public ProductShowResponseDto Product { get; set; }

}
