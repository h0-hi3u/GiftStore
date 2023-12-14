using GiftStore.Core.Contracts;

namespace GiftStore.Core.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private Dictionary<string, object> Repositories;
        public IApplicationDbContext _applicationDbContext;
        public UnitOfWork(IApplicationDbContext applicationDbContext)
        {
            Repositories = new Dictionary<string, object>();
            _applicationDbContext = applicationDbContext;
        }

        public IRepository<T> Repository<T>() where T : class
        {
            var type = typeof(T);
            var typeName = type.Name;
            lock(Repositories)
            {
                if (Repositories.ContainsKey(typeName))
                {
                    return (IRepository<T>)Repositories[typeName];
                } else
                {
                    var repository = new Repository<T>(_applicationDbContext);
                    Repositories.Add(typeName, repository);
                    return repository;
                }
            }
        }
        public async Task Commit()
        {
            await _applicationDbContext.SaveChangesAsync();
        }
    }
}
