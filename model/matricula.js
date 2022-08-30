var conexao = require('../config/conexao')

var MatriculaSchema = conexao.Schema({
    nome:{type:String},
    data:{type:String},
    anoLetivo:{type:String},
    especificidade:{type:String},
    especificar:{type:String},
    nomeResponsavel:{type:String},
    endereco:{type:String},
    zona:{type:String},
    telefones:{type:String},
    situacao:{type:String},
    escolasPreferencia:{type:String},
    turnoPreferencia:{type:String},
    atendimentosClinicos:{type:String},
    turnosAtendimentos:{type:String},
    informacoesInportantes:{type:String},
    necessitaraCuidador:{type:String},
    escola:{type:conexao.Schema.Types.ObjectId, ref: "Escola"}
})

module.exports = conexao.model("Matricula",MatriculaSchema)