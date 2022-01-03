using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public virtual string id { get; set; }
        public virtual string firstname { get; set; }
        public virtual string lastname { get; set; }
        public virtual string username { get; set; }
        public virtual string password { get; set; }
        public virtual decimal accountbalance { get; set; }
    }
}
