using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Constants
{
    public static class SortConstants
    {
        public static string[] SortOptions = {
            "",
            "Name ASC", "Name DESC",
            "Price ASC", "Price DESC",
            "CreateDate ASC", "CreateDate DESC"
        }; 
    }
}
