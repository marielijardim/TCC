var conexao = require('../config/conexao')

var MatriculaSchema = conexao.Schema({
    nome:{type:String},
    data:{type:String},
    nomeResponsavel:{type:String},
    endereco:{type:String},
    email:{type:String},
    senha:{type:String},
    foto:{type:String}
})

module.exports = conexao.model("Matricula",MatriculaSchema)