using System.Xml.Schema;

namespace GiftStore.DAL.Model.Entity;

public class Order
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public DateTime TimeCreate { get; set; }
    public int OrderStatus { get; set; }
    public Guid PaymentMethodId { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public double TotalPrice { get; set; }
    public virtual ICollection<OrderDetail> OrderDetails { get; set;}
}
