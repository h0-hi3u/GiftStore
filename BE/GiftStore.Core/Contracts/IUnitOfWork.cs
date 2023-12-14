using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.Core.Contracts
{
    public interface IUnitOfWork
    {
        IRepository<T> Repository<T>() where T : class; // Generic o? muc' phuong thuc
        // begin 
        Task Commit();
    }
}
