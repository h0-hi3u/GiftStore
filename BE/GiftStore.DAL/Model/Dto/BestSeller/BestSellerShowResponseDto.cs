namespace GiftStore.DAL.Model.Dto.BestSeller;

public class BestSellerShowResponseDto
{
    public Guid Id { get; set; }
    public int NumberSelled { get; set; }
    public double TotalPriceSelled { get; set; }
    public Guid ProductId { get; set; }
}
