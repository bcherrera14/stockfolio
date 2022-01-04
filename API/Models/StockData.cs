using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class StockData
    {
        public virtual string stock_id { get; set; }
        public virtual string user_id { get; set; }
        public virtual string companyname { get; set; }
        public virtual string symbol { get; set; }
        public virtual int totalshares { get; set; }
        public virtual string purchaseprice { get; set; }
    }
}
