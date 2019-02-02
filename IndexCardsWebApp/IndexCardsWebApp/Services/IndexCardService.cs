using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using IndexCardsWebApp.Models;

namespace IndexCardsWebApp.Services
{
    public class IndexCardService : IIndexCardService
    {

        public List<IndexCard> GetAll()
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "IndexCard_GetAll";
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    var indexCards = new List<IndexCard>();
                    while (reader.Read())
                    {
                        var indexCard = new IndexCard
                        {
                            Id = (int)reader["id"],
                            Front = (string)reader["front"],
                            Back = (string) reader["back"],
                            CardStatus = (string) reader["cardStatus"],
                            SortOrder = (int)reader["sortOrder"],
                            DateCreated = (DateTime)reader["DateCreated"],
                            DateModified = (DateTime)reader["DateModified"]
                        };
                        indexCards.Add(indexCard);

                    }

                    return indexCards;
                }

            }

        }
        
        public int Create (IndexCardCreate request)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "IndexCard_Create";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Front", request.Front);
                cmd.Parameters.AddWithValue("@Back", request.Back);
                cmd.Parameters.AddWithValue("@CardStatus", request.CardStatus);
                cmd.Parameters.AddWithValue("@SortOrder", request.SortOrder);
                cmd.Parameters.AddWithValue("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                return (int)cmd.Parameters["@Id"].Value;
            }
        }

        public void Update (IndexCardUpdate request)
        {
            using (var con = GetConnection ())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "IndexCard_Update";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", request.Id);
                cmd.Parameters.AddWithValue("@Front", request.Front);
                cmd.Parameters.AddWithValue("@Back", request.Back);
                cmd.Parameters.AddWithValue("@CardStatus", request.CardStatus);
                cmd.Parameters.AddWithValue("@SortOrder", request.SortOrder);
                cmd.ExecuteNonQuery();
            };
        }

        public IndexCard GetById (int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "IndexCard_GetById";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                IndexCard indexCard = new IndexCard();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (!reader.Read())
                    {
                        return null;
                    }
                    indexCard.Id = (int)reader["Id"];
                    indexCard.Front = reader["front"] as String;
                    indexCard.Back = reader["back"] as String;
                    indexCard.CardStatus = reader["cardStatus"] as String;
                    indexCard.SortOrder = (int)reader["sortOrder"];
                    indexCard.DateCreated = (DateTime)reader["dateCreated"];
                    indexCard.DateModified = (DateTime)reader["dateModified"];
                }
                return indexCard;
            }
        }


        public RandomCardResponse GetRandom ()
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "IndexCard_GetRandom";
                cmd.CommandType = CommandType.StoredProcedure;                    
                RandomCardResponse randomCardResponse = new RandomCardResponse();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if(!reader.Read())
                    {
                        return null;
                    }
                    randomCardResponse.Id = (int)reader["id"];              
                    randomCardResponse.Front = reader["front"] as String;
                    randomCardResponse.Back = reader["back"] as String;
                    randomCardResponse.CardStatus = reader["cardStatus"] as String;
                    randomCardResponse.SortOrder = (int)reader["sortOrder"];
                    randomCardResponse.DateCreated = (DateTime)reader["dateCreated"];
                    randomCardResponse.DateModified = (DateTime)reader["dateModified"];
                    randomCardResponse.TotalTableRows = (int)reader["totalTableRows"];
                    randomCardResponse.TotalStatusRows = (int)reader["totalStatusRows"];
                }
                return randomCardResponse;
            }
        }


        public void ResetCards()
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "indexCard_Reset";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }
        }

        public void Delete(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "IndexCard_Delete";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.ExecuteNonQuery();
            }
        }

        //helper method to create and open a database connection
        SqlConnection GetConnection()
        {
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Default"].ConnectionString);
            con.Open();
            return con;
        }

    }
}