using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Model.Dto.BestSeller
{
    public class BestSellerCreateRequestDto
    {
        public int NumberSelled { get; set; }
        public double TotalPriceSelled { get; set; }
        public Guid ProductId { get; set; }
    }
}
