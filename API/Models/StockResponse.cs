using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class StockResponse
    {
        public  string  companyName { get; set; }
        public string symbol { get; set; }
        public string latestPrice { get; set; }


    }

    public class StockList
    {
        public string Stocks { get; set; }
    }
}
