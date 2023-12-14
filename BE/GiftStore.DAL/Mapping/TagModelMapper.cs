using GiftStore.Core.Contracts;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace GiftStore.DAL.Mapping;

public class TagModelMapper : IModelMapper
{
    public void Mapping(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tag>(entity =>
        {
            entity.ToTable(nameof(Tag));
            
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasColumnName(nameof(Tag.Name));
            entity.Property(e => e.Description).HasColumnName(nameof(Tag.Description));
            entity.Property(e => e.IsDeleted).HasColumnName(nameof(Tag.IsDeleted));
        });

        //modelBuilder.Entity<Tag>()
        //    .HasMany(e => e.Product)
        //    .WithMany(p => p.Tag)
        //    .Map(pt =>
        //    {
        //        pt.
        //    })
    }
}
