﻿using GiftStore.Core.Contracts;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Mapping;

public class ProductModelMapper : IModelMapper
{
    public void Mapping(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable(nameof(Product));
            entity.Property(p => p.CreateDate).HasDefaultValueSql("GETDATE()");
        });
    }
}
