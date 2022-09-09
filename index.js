const express = require('express')
const app = express()
var bodyParser =  require("body-parser")
var cookieParser = require("cookie-parser")
var path = require("path")
var Escola = require("./model/escola")
var Aluno = require("./model/aluno")
var Matricula = require("./model/matricula")
//var upload = require("./config/configMulter")


const multer = require('multer')
//const upload = multer({ dest: 'uploads/' })

//componente para fazer o upload do arquivo e salvar na pasta upload com a extenção do arquivo por exemplo.png
// uorial uso multer https://www.webdevdrops.com/upload-arquivos-node-js-multer/
const { uuid } = require('uuidv4')

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
})


app.use(cookieParser())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

//tornar a pasta de fotos /uploads acessiel pelo navegador de internet
app.use('/uploads', express.static('uploads'))





//rota que abre a tela de login
app.get('/login',function(req,res){
    res.render('index.ejs')
})

app.post('/login',function(req,res){
    res.redirect('/adicionarmatricula')
})



//rota que abre a tela de adicionar aluno
app.get('/adicionarmatricula',function(req,res){
    Escola.find({}).exec(function(err,docs){
        res.render('matricula/adiciona.ejs',{Escolas:docs})
    })
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
        turnoPreferencia: req.body.txtTurno,
        atendimentosClinicos: req.body.txtAtendimentos,
        turnosAtendimentos: req.body.txtTurnos,
        informacoesInportante: req.body.txtInformacoes,
        necessitaraCuidador: req.body.txtNecessitara,
        escola: req.body.txtEscola

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

//rota que abre a tela de listar todas as matriculas
app.post('/listaraluno',function(req,res){
    Matricula.find({nome: new RegExp(req.body.txtPesquisa,'g')}).exec(function(err,docs){
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
    Escola.find({}).exec(function(err,docs){
        Matricula.findById(req.params.id,function(err,docs1){
            if(err){
            console.log(err)
            }else{
                res.render('matricula/edt.ejs',{matricula: docs1, Escolas:docs})
            }
        })
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
        turnoPreferencia: req.body.txtTurno,
        atendimentosClinicos: req.body.txtAtendimentos,
        turnosAtendimentos: req.body.txtTurnos,
        informacoesInportante: req.body.txtInformacoes,
        necessitaraCuidador: req.body.txtNecessitara,
        escola: req.body.txtEscola
    
     },function(err,docs){
        //busca as matriculas que quer editar e edita os dados no modelo
        res.redirect('/listaraluno')
    })
     
})


//rota que abre a tela de adicionar escola
app.get('/adicionarescolas',function(req,res){
    res.render('escola/adiciona.ejs')
})


//rota que adiciona a escola no banco de dados
app.post('/adicionarescolas',upload.single("txtFoto"),function(req,res){

    const { filename, size } = req.file

    //return res.render('avatar', { image: `/uploads/${filename}`, size })

    //recebe os dados do formulario
     var escola = new Escola({
        nome: req.body.txtEscola,
        endereco: req.body.txtEndereco,
        foto: `/uploads/${filename}`
        

     })
     escola.save(function(err){
        if(err){
          console.log(err)
        }else{
         //cria e adiciona os dados no modelo
         res.redirect('/listarescolas');
        }
     })
     
    
})

//rota que abre a tela de listar todas as escolas
app.get('/listarescolas',function(req,res){
    Escola.find({}).exec(function(err,docs){
        //buscar todas as escolas que existem
        res.render('escola/add.ejs',{Escolas:docs})
    
    
}) })

app.post('/listarescolas',function(req,res){
    Escola.find({nome: new RegExp(req.body.txtPesquisa,'g')}).exec(function(err,docs){
        //buscar todas as escolas que existem
        res.render('escola/add.ejs',{Escolas:docs})
    
    
}) })
//rota que lista as escolas por um filtro
app.post('/listarescolas',function(req,res){
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
            res.redirect('/listarescolas')
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
        res.render('escola/edt.ejs',{escola: docs})
        }
    })
    
})
//rota que edita a escola no banco de dados
app.post('/editarescola/:id',upload.single("txtFoto"),function(req,res){
    const { filename, size } = req.file
    //return res.render('avatar', { image: `/uploads/${filename}`, size })
    //recebe os dados do formulario
    Escola.findByIdAndUpdate(req.params.id,
    {
        id: req.body.txtId,
        nome: req.body.txtNome,
        endereco: req.body.txtEndereco,
        foto: `/uploads/${filename}`
       
    
     },function(err,docs){
        //busca a escola que quer editar e edita os dados no modelo
        res.redirect('/listarescolas')
    })
     
})

app.get('/listaralunos/:id',function(req,res){
    Matricula.find({escola:req.params.id}).exec(function(err,docs){
        //buscar todas as matriculas que existem
        res.render('matricula/list.ejs',{Matriculas:docs})   
    })
})




app.listen(3000,function(){
    console.log("Conexão inicializada")
})
