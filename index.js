const express = require('express')
const app = express()
var bodyParser =  require("body-parser")
var cookieParser = require("cookie-parser")
var path = require("path")


app.use(cookieParser())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

app.get('/', function(req,res){
    res.render('index.ejs', {})
})

app.get('/usuarios', function(req,res){
    res.render('usuarios.ejs', {usuarios:[
        {nome:"Marieli", email:"marielijardim190@gmail.com"},
        {nome:"Andressa", email:"andressa426@gmail.com"}
    ]})
})

app.get('/add',function(req,res){
    res.render("adiciona.ejs")
})



app.post('/add',function(req,res){
    console.log("Nome: " + req.body.txtNome + " Email: " + req.body.txtEmail)
})




app.listen(3000,function(){
    console.log("Conexão inicializada ")
})
