using GiftStore.Core.Contracts;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Mapping;

public class CategoryModelMapper : IModelMapper
{
    public void Mapping(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(enity =>
        {
            enity.ToTable(nameof(Category));

            enity.HasKey(e => e.Id);
            enity.Property(e => e.Name).IsRequired().HasColumnName(nameof(Category.Name));
            enity.Property(e => e.Description).HasColumnName(nameof(Category.Description));
            enity.Property(e => e.TagId).HasColumnName(nameof(Category.TagId));
            enity.Property(e => e.IsDeleted).HasColumnName(nameof(Category.IsDeleted));
        });

        modelBuilder.Entity<Category>()
            .HasOne(e => e.Tag)
            .WithMany(t => t.Category)
            .HasForeignKey(e => e.TagId);
    }
}
