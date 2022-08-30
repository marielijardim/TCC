const express = require('express')
const app = express()
var bodyParser =  require("body-parser")
var cookieParser = require("cookie-parser")
var path = require("path")
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
    res.render('tela2.ejs')
})
//rota que adiciona o aluno no banco de dados
app.post('/adicionarmatricula',function(req,res){
    //recebe os dados do formulario
     var matricula = new Matricula({
        nome: req.body.txtNome,
        data: req.body.txtData,
        anoLetivo: req.body.txtAno,
        especificidade: req.body.txtEspecificidade,
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
        necessitaraCuidador: req.body.txtNecessitara

     })
     matricula.save(function(err){
        if(err){
          console.log(err)
        }else{
         //cria e adiciona os dados no modelo
         res.redirect('/listaraluno');
        }
     })
    
})
//rota que abre a tela de listar todas as matriculas
app.get('/listaraluno',function(req,res){
    Matricula.find({}).exec(function(err,docs){
        //buscar todas as matriculas que existem
        res.render('matricula/list.ejs',{Matriculas:docs})
    
    
}) })
//rota que lista as matriculas por um filtro
app.post('/listaraluno',function(req,res){
    //buscar as matriculas com filtro
    res.render('matricula/list.ejs', {matricula:Matriculas})
})
//rota para deletar uma matricula
app.get('/deletaraluno/:id',function(req,res){
    //buscar todas as matriculas que existem
    Matricula.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
          }else{
            res.redirect('/listaraluno')
          }
    })
    
    
})

//rota que abre a tela de editar matricula
app.get('/editaraluno/:id',function(req,res){
    //buscar os dados da matricula que queremos editar
    Matricula.findById(req.params.id,function(err,docs){
        if(err){
          console.log(err)
        }else{
        res.render('matricula/edt.ejs',{Matriculas: docs})
        }
    })
    
})
//rota que edita a matricula no banco de dados
app.post('/editaraluno/:id',function(req,res){
    //recebe os dados do formulario
    Matricula.findByIdAndUpdate(req.params.id,
    {
        id: req.body.txtId,
        nome: req.body.txtNome,
        data: req.body.txtData,
        anoLetivo: req.body.txtAno,
        especificidade: req.body.txtEspecificidade,
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
        necessitaraCuidador: req.body.txtNecessitara
    
     },function(err,docs){
        //busca as matriculas que quer editar e edita os dados no modelo
        res.redirect('/listaraluno')
    })
     
})


//rota que abre a tela de adicionar escola
app.get('/adicionarescolas',function(req,res){
    res.render('escola/adiciona.ejs')
})
app.get('/add',function(req,res){
    res.render('escola/add.ejs')
})

//rota que adiciona a escola no banco de dados
app.post('/adicionarescolas',function(req,res){
    //recebe os dados do formulario
     var escola = new Escola({
        nome: req.body.txtNome,
        endereco: req.body.txtEndereco,
        foto: req.body.txtFoto
        

     })
     escola.save(function(err){
        if(err){
          console.log(err)
        }else{
         //cria e adiciona os dados no modelo
         res.redirect('/listarescola');
        }
     })
     
    
})

//rota que abre a tela de listar todas as escolas
app.get('/listarescola',function(req,res){
    Escola.find({}).exec(function(err,docs){
        //buscar todas as escolas que existem
        res.render('escola/list.ejs',{Escolas:docs})
    
    
}) })
//rota que lista as escolas por um filtro
app.post('/listarescola',function(req,res){
    //buscar as escolas com filtro
    res.render('escola/list.ejs', {escola:Escolas})
})
//rota para deletar uma escola
app.get('/deletarescola/:id',function(req,res){
    //buscar todas as escolas que existem
    Escola.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
          }else{
            res.redirect('/listarescola')
          }
    })
    
    
})

//rota que abre a tela de editar escolas
app.get('/editarescola/:id',function(req,res){
    //buscar os dados das escolas que queremos editar
    Escola.findById(req.params.id,function(err,docs){
        if(err){
          console.log(err)
        }else{
        res.render('escola/edt.ejs',{Escola: docs})
        }
    })
    
})
//rota que edita a escola no banco de dados
app.post('/editarescola/:id',function(req,res){
    //recebe os dados do formulario
    Escola.findByIdAndUpdate(req.params.id,
    {
        id: req.body.txtId,
        nome: req.body.txtNome,
        endereco: req.body.txtEndereco,
        foto: req.body.txtFoto
       
    
     },function(err,docs){
        //busca a escola que quer editar e edita os dados no modelo
        res.redirect('/listarescola')
    })
     
})


app.get('/adicionar',function(req,res){
    res.render('aluno/adiciona.ejs')
})




app.listen(3000,function(){
    console.log("Conexão inicializada")
})
