using GiftStore.DAL.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Model.Dto.ImageProduct;

public class ImageProductUpdateRequestDto
{
    public Guid Id { get; set; }
    public string Image { get; set; }
    public Guid ProductId { get; set; }
}
