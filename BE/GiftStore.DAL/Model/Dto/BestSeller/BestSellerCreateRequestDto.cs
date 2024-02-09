using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Model.Dto.BestSeller
{
    public class BestSellerCreateRequestDto
    {
        public int NumberSold { get; set; }
        public double TotalPriceSold { get; set; }
        public Guid ProductId { get; set; }
    }
}
