var conexao = require('../config/conexao')

var EscolaSchema = conexao.Schema({
    nome:{type:String},
    endereco:{type:String},
    foto:{type:String}
})

module.exports = conexao.model("Escola",EscolaSchema)