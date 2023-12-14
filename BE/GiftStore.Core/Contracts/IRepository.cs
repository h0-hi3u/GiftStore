using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.Core.Contracts
{
    public interface IRepository<T> where T : class
    {
        DbSet<T> Entities();
        void Add(T entity);
        Task AddAsync(T entity);
        void AddRange(IEnumerable<T> enity);
        Task AddRangeAsync(IEnumerable<T> enity);
        void Update(T entity);
        //Task UpdateAsync(T entity);
        IEnumerable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync();
        T Get(object id);
        Task<T> GetAsync(object id);
        T Get(Expression<Func<T, bool>> specification);
        Task<T> GetAsync(Expression<Func<T, bool>> specification);
        //T Find(params object[] keyValues);
        //Task<T> FindAsync(params object[] keyValues);
        void Delete(object id);
        Task DeleteAsync(object id);
        void Delete(T entity);
       // Task DeleteAsync(T entity);
    }
}
