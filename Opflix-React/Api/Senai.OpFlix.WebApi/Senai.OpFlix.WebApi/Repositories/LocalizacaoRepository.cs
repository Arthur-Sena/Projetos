using MongoDB.Driver;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {

        private readonly IMongoCollection<Localizacoes> _localizacoes;


        public LocalizacaoRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("t_opflix");
            _localizacoes = database.GetCollection<Localizacoes>("localizacao");

        }

        public void Cadastrar(Localizacoes local)
        {
            _localizacoes.InsertOne(local);
        }

        public List<Localizacoes> Listar()
        {
            return _localizacoes.Find(l => true).ToList();
        }
    }
}
