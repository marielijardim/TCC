var conexao = require('../config/conexao')

var AlunoSchema = conexao.Schema({
    nome:{type:String},
    foto:{type:String}
})

module.exports = conexao.model("Aluno",AlunoSchema)