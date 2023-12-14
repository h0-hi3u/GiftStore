﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Model.Entity;

public class ImageProduct
{
    public Guid Id { get; set; }
    public string Image { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
}
