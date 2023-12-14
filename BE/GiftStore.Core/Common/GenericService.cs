using Autofac;
using Autofac.Core;
using GiftStore.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.Core.Common
{
    public abstract class GenericService
    {
        protected ILifetimeScope _scope;

        protected GenericService(ILifetimeScope scope)
        {
            _scope = scope;
        }
        protected T Resolve<T>()
        {
            return _scope.Resolve<T>();
        }
    }
}
