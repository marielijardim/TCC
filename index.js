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
    res.redirect('./tela2.ejs')
})

app.get('/menu',function(req,res){
    res.render('tela2.ejs')
})

//rota que abre a tela de adicionar escola
app.get('/adicionarescola',function(req,res){
    res.render('escola/adiciona.ejs')
})
//rota que adiciona a escola no banco de dados
app.post('/adicionarescola',function(req,res){
    //recebe os dados do formulario
    //cria e adiciona os dados no modelo
    res.redirect('/listarescola')
})
//rota que abre a tela de editar escola
app.get('/editarescola/:id',function(req,res){
    //buscar os dados da escola que queremos editar
    res.render('escola/edt.ejs')
})
//rota que edita a escola no banco de dados
app.post('/editarescola/:id',function(req,res){
    //recebe os dados do formulario
    //busca a escola que quer editar e edita os dados no modelo
    res.redirect('/listarescola')
})
//rota que abre a tela de listar todas as escola
app.get('/listarescola',function(req,res){
    //buscar todas as escolas que existem
    res.render('escola/lst.ejs', {Escolas:escolas})
})
//rota que lista as escolas por um filtro
app.post('/listarescola',function(req,res){
    //buscar as escolas com filtro
    res.render('escola/lst.ejs', {Escolas:escolas})
})
//rota para deletar uma escola
app.get('/deletarescola/:id',function(req,res){
    //buscar todas as escolas que existem
    res.redirect('/listarescola')
})

app.listen(3000,function(){
    console.log("Conexão inicializada")
})
