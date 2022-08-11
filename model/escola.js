var conexao = require('../config/conexao')

var EscolaSchema = conexao.Schema({
    nome:{type:String},
    email:{type:String},
    foto:{type:String}
})

module.exports = conexao.model("Escola",EscolaSchema)