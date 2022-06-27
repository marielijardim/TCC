const express = require('express')
const app = express()

app.get('/', function(req,res){
    res.send("Ola!")
})

app.get('/msg', function(req,res){
    res.send("Essa mensagem é automática!")
})

app.get('/sobre', function(req,res){
    res.send("Esta paginna esta sendo desenvolvida!")
})


app.listen(3000,function(){
    console.log("Conexão inicializada ")
})
