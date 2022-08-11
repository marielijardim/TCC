var conexao = require('../config/conexao')

var MatriculaSchema = conexao.Schema({
    nome:{type:String},
    email:{type:String},
    senha:{type:String},
    foto:{type:String}
})

module.exports = conexao.model("Matricula",MatriculaSchema)