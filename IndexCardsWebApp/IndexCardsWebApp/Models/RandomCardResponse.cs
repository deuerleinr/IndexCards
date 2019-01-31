using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndexCardsWebApp.Models
{
    public class RandomCardResponse : IndexCard
    {
        public int TotalTableRows { get; set; }
        public int TotalStatusRows { get; set; }
    }
}