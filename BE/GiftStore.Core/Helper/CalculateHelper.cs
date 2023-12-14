using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.Core.Helper
{
    public static class CalculateHelper
    {
        public static int CalculatePaging(int pageSize, int pageIndex)
        {
            return (pageIndex - 1) * pageSize;
        }
    }
}
