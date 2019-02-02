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
        readonly IIndexCardService indexCardService;

        public IndexCardController(IIndexCardService indexCardService)
        {
            this.indexCardService = indexCardService;
        }


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

        [HttpPut, Route("{Id:Int}")]
        public void Update(IndexCardUpdate model)
        {
            indexCardService.Update(model);
        }


        [HttpGet, Route("random")]
        public RandomCardResponse GetRandom()
        {
            return indexCardService.GetRandom();
        }

        [HttpGet, Route("{Id:Int}")]
        public IndexCard GetById(int id)
        {
            return indexCardService.GetById(id);
        }


        [HttpPost, Route("reset")]
        public void ResetCards()
        {
            indexCardService.ResetCards();
        }

        [HttpDelete, Route("{Id:Int}")]
        public void Delete(int id)
        {
            indexCardService.Delete(id);
        }
    }
}