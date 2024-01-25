namespace GiftStore.DAL.Model.Entity;

public class BestSeller
{
    public Guid Id { get; set; }
    public int NumberSelled { get; set; }
    public double TotalPriceSelled { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
}
