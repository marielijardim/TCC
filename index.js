const express = require('express')
const app = express()
var bodyParser =  require("body-parser")
var cookieParser = require("cookie-parser")
var path = require("path")
var Usuario = require("./model/usuario")
var Escola = require("./model/escola")
var Aluno = require("./model/aluno")
var Matricula = require("./model/matricula")


app.use(cookieParser())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

//rota que abre a tela de login
app.get('/login',function(req,res){
    res.render('index.ejs')
})
//rota que faz o login
app.post('/menu',function(req,res){
    res.redirect('menu')
})

app.get('/menu',function(req,res){
    res.render('tela2.ejs')
})


//rota que abre a tela de adicionar aluno
app.get('/adicionarmatricula',function(req,res){
    res.render('matricula/adiciona.ejs')
})
//rota que adiciona o aluno no banco de dados
app.post('/adicionarmatricula',function(req,res){
    //recebe os dados do formulario
     var matricula = new Matricula({
        nome: req.body.txtNome,
        data: req.body.txtData,
        anoLetivo: req.body.txtAno,
        especificidade: req.body.txtEspecificidade,
        especificar: req.body.txtEspecificar,
        nomeResponsavel: req.body.txtNomeResponsavel,
        endereco: req.body.txtEndereco,
        zona: req.body.txtZona,
        telefones: req.body.txtTelefone,
        situacao: req.body.txtSituacao,
        escolasPreferencia: req.body.txtEscolas,
        turnoPreferencia: req.body.txtTurno,
        atendimentosClinicos: req.body.txtAtendimentos,
        turnosAtendimentos: req.body.txtTurnos,
        informacoesInportante: req.body.txtInformacoes,
        necessitaraCuidador: req.body.txtNecessitara,
        email: req.body.txtEmail,
        foto: req.body.txtFoto

     })
     matricula.save(function(err){
        if(err){
          console.log(err)
        }else{
         //cria e adiciona os dados no modelo
         res.redirect('/editarmatricula');
        }
     })
    
})
//rota que abre a tela de editar matricula
app.get('/editarmatricula',function(req,res){
    //buscar os dados da matricula que queremos editar
    res.render('matricula/edt.ejs')
})
//rota que edita a escola no banco de dados
app.post('/editarmatricula/:id',function(req,res){
    //recebe os dados do formulario
    var matricula = new Matricula({
        nome: req.body.txtNome,
        data: req.body.txtData,
        anoLetivo: req.body.txtAno,
        especificidade: req.body.txtEspecificidade,
        especificar: req.body.txtEspecificar,
        nomeResponsavel: req.body.txtNomeResponsavel,
        endereco: req.body.txtEndereco,
        zona: req.body.txtZona,
        telefones: req.body.txtTelefone,
        situacao: req.body.txtSituacao,
        escolasPreferencia: req.body.txtEscolas,
        turnoPreferencia: req.body.txtTurno,
        atendimentosClinicos: req.body.txtAtendimentos,
        turnosAtendimentos: req.body.txtTurnos,
        informacoesInportante: req.body.txtInformacoes,
        necessitaraCuidador: req.body.txtNecessitara,
        email: req.body.txtEmail,
        foto: req.body.txtFoto
     })
     matricula.save(function(err){
        if(err){
          console.log(err)
        }else{
    //busca a escola que quer editar e edita os dados no modelo
    res.redirect('/listarmatricula')
        }
})

})
//rota que abre a tela de listar todas as matriculas
app.get('/listarmatricula',function(req,res){
    //buscar todas as matriculas que existem
    res.render('matricula/list.ejs', {Matricula:matriculas})
})
//rota que lista as escolas por um filtro
app.post('/listarmatricula',function(req,res){
    //buscar as escolas com filtro
    res.render('matricula/list.ejs', {Matricula:matriculas})
})
//rota para deletar uma matricula
app.get('/deletarmatricula/:id',function(req,res){
    //buscar todas as matriculas que existem
    res.redirect('/listarmatricula')
})




app.listen(3000,function(){
    console.log("Conexão inicializada")
})
