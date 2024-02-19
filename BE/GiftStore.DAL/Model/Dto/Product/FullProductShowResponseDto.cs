using GiftStore.DAL.Model.Dto.ImageProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Model.Dto.Product
{
    public class FullProductShowResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Variant { get; set; }
        public bool IsParent { get; set; }
        public string? Description { get; set; }
        public virtual ICollection<ImageProductShowResponseDto> ImageProduct { get; set; } = new List<ImageProductShowResponseDto>();
        public virtual ICollection<ProductShowResponseDto> Children { get; set; } = new List<ProductShowResponseDto>();
    }
}
