using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GiftStore.Core.Implementations;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = DatabaseHelper.GetConnectionString();
        optionsBuilder.UseSqlServer(connectionString, options
            => options.CommandTimeout(60))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
                .LogTo(Console.WriteLine, LogLevel.Information);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var type = ReflectionHelper.GetAssignableTo(typeof(IModelMapper));
        foreach (var t in type)
        {
            var instance = Activator.CreateInstance(t) as IModelMapper;
            instance?.Mapping(modelBuilder);
        }
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<T> CreateSet<T>() where T : class
    {
        var a = base.Set<T>();
        return a;
    }

    public void Refeshed<T>(T entity) where T : class
    {
        base.Entry<T>(entity).Reload();
    }

    public async Task SaveChangesAsync()
    {
        await base.SaveChangesAsync();
    }

    public void SetModified<T>(T entity) where T : class
    {
        base.Entry<T>(entity).State = EntityState.Modified;
    }
    public void SetDeleted<T>(T entity) where T : class
    {
        base.Entry<T>(entity).State = EntityState.Deleted;
    }

    public new void SaveChanges()
    {
        base.SaveChanges();
    }
}
