using GiftStore.Core.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace GiftStore.Core.Implementations;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly IApplicationDbContext _context;

    public Repository(IApplicationDbContext context)
    {
        _context = context;
    }

    public DbSet<T> Entities() => _context.CreateSet<T>();

    public void Add(T entity)
    {
        Entities().Add(entity);
    }

    public async Task AddAsync(T entity)
    {
        await Entities().AddAsync(entity);
    }

    public void AddRange(IEnumerable<T> enity)
    {
        Entities().AddRange(enity);
    }

    public async Task AddRangeAsync(IEnumerable<T> enity)
    {
        await Entities().AddRangeAsync(enity);
    }

    public void Delete(object id)
    {
        var remove = Entities().Find(id);
        if(remove != null)
        {
            Delete(remove);
        } 
    }

    public void Delete(T entity)
    {
        Entities().Remove(entity);
    }

    public async Task DeleteAsync(object id)
    {
        var remove = await Entities().FindAsync(id);
        if(remove != null)
        {
            Delete(remove);
        }
    }

    //public Task DeleteAsync(T entity)
    //{
    //    Entities.RemoveAsync(entity);
    //}

    //public T Find(params object[] keyValues)
    //{
    //    return Entities.Find(keyValues);
    //}

    //public async Task<T> FindAsync(params object[] keyValues)
    //{
    //    return await Entities.FindAsync(keyValues);
    //}

    public T Get(object id)
    {
        return Entities().Find(id);
    }

    public T Get(Expression<Func<T, bool>> specification)
    {
        return Entities().FirstOrDefault(specification);
    }

    public IEnumerable<T> GetAll()
    {
        return Entities().AsEnumerable();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await Entities().ToListAsync();
    }

    public async Task<T> GetAsync(object id)
    {
        return await Entities().FindAsync(id);
    }

    public async Task<T> GetAsync(Expression<Func<T, bool>> specification)
    {
        return await Entities().FirstOrDefaultAsync(specification);
    }

    public void Update(T entity)
    {
        Entities().Update(entity);
    }

    //public Task UpdateAsync(T entity)
    //{
    //    Entities.
    //}
}
