using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using IndexCardsWebApp.Models;
using IndexCardsWebApp.Services;



namespace IndexCardsWebApp.Controllers
{
    [RoutePrefix("api/indexcards")]
    public class IndexCardController : ApiController
    {
        readonly IndexCardService indexCardService = new IndexCardService();

        [HttpGet, Route]
        public List<IndexCard> GetAll()
        {
            return indexCardService.GetAll();
        }

        [HttpPost, Route]
        public int Create(IndexCardCreate model)
        {
            return indexCardService.Create(model);
        }



    }
}