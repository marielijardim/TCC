const express = require('express')
const app = express()
var bodyParser =  require("body-parser")
var cookieParser = require("cookie-parser")
var path = require("path")
var Usuario = require("./model/usuario")


app.use(cookieParser())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

app.get('/', function(req,res){
    Usuario.find({}).exec(function(err,docs ){
        res.render('index.ejs', {Usuarios:docs})
    })
   
})



app.get('/add',function(req,res){
    res.render("adiciona.ejs")
})

app.get('/menu',function(req,res){
    res.render("tela2.ejs")
})

app.get('/404',function(req,res){
    res.render("404.ejs")
})

app.get('/blank',function(req,res){
    res.render("blank.ejs")
})

app.get('/cards',function(req,res){
    res.render("cards.ejs")
})

app.get('/charts',function(req,res){
    res.render("charts.ejs")
})

app.get('/forgot',function(req,res){
    res.render("forgot-password.ejs")
})


app.get('/site',function(req,res){
    res.render("index.ejs",{})
})



app.post('/add',function(req,res){
    var usuario = new Usuario({
        nome: req.body.txtNome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
        foto: req.body.txtFoto
    })
    usuario.save(function(err){
        if(err){
            console.log(err)
    
        }else{
            res.redirect('/');
         
        }
    })
    
})



app.listen(3000,function(){
    console.log("Conexão inicializada")
})
