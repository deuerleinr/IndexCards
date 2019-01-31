using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IndexCardsWebApp.Models
{
    public class IndexCardUpdate : IndexCardCreate
    {
        [Required]
        public int? Id { get; set; }
    }
}