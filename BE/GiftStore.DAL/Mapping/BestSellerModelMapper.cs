using GiftStore.Core.Contracts;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Mapping;

public class BestSellerModelMapper : IModelMapper
{
    public void Mapping(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BestSeller>(entity =>
        {
            entity.ToTable(nameof(BestSeller));

            //entity.HasKey(e => e.Id);

            //entity.Property(e => e.NumberSelled).IsRequired();
        });
    }
}
