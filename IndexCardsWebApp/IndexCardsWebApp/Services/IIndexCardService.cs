﻿using System.Collections.Generic;
using IndexCardsWebApp.Models;

namespace IndexCardsWebApp.Services
{
    public interface IIndexCardService
    {
        int Create(IndexCardCreate request);
        List<IndexCard> GetAll();
    }
}