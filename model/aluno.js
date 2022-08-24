var conexao = require('../config/conexao')

var AlunoSchema = conexao.Schema({
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
})

module.exports = conexao.model("Aluno",AlunoSchema)