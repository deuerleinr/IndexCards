using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IndexCardsWebApp.Models
{
    public class IndexCardCreate
    {
        [Required]
        public string Front { get; set; }
        public string Back { get; set; }
        public string CardStatus { get; set; }
        public int SortOrder { get; set; }
    }
}