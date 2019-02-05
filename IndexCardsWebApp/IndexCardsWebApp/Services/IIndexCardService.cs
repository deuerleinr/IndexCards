using System.Collections.Generic;
using IndexCardsWebApp.Models;

namespace IndexCardsWebApp.Services
{
    public interface IIndexCardService
    {
        int Create(IndexCardCreate request);
        List<IndexCard> GetAll();
        void Update (IndexCardUpdate request);
        void Pass(IndexCardUpdate request);
        RandomCardResponse GetRandom();
        IndexCard GetById(int id);
        void ResetCards();
        void Delete(int id);
    }
}

 