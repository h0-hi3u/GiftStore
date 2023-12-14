using Microsoft.EntityFrameworkCore;

namespace GiftStore.Core.Contracts
{
    public interface IApplicationDbContext
    {
        DbSet<T> CreateSet<T>() where T : class;
        void SetModified<T>(T entity) where T : class;
        void SetDeleted<T>(T enity) where T : class;
        void Refeshed<T>(T entity) where T : class;
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
