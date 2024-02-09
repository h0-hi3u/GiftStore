namespace GiftStore.DAL.Model.Entity;

public class BestSeller
{
    public Guid Id { get; set; }
    public int NumberSold { get; set; }
    public double TotalPriceSold { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
}
