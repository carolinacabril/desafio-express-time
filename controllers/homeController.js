const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');


let fileNewsLetter

const homeController = {
  index: (req, res) => {
    let servicos = [{
        nome: 'Dev full stack',
        imagem: '/imagens/undraw_dev_focus.svg'
      },
      {
        nome: 'Consultoria UX',
        imagem: '/imagens/undraw_mobile_apps.svg'
      },
      {
        nome: 'Marketing Digital',
        imagem: '/imagens/undraw_social_dashboard.svg'
      },
      {
        nome: 'Suporte tecnico',
        imagem: '/imagens/undraw_dev_focus.svg'
      },
      {
        nome: 'Data Science',
        imagem: '/imagens/undraw_mobile_apps.svg'
      },
    ];

    let banners = [
      '/imagens/slider1.jpg',
      '/imagens/slider2.jpg',
      '/imagens/slider3.jpg',
    ];

    res.render('index', {
      title: 'Home',
      listaServicos: servicos,
      listaBanners: banners
    });
  },
  contato: (req, res) => {

    let {
      nome,
      email,
      mensagem
    } = req.body;
    // novo conteudo
    let infoContato = {
      nome,
      email,
      mensagem
    };
    // caminho e nome do arquivo
    let fileContato = path.join('db', 'contatos.json');

    let listaContato = [];

    if (fs.existsSync(fileContato)) {
      // trazer informações do arquivo
      listaContato = fs.readFileSync(fileContato, {
        encoding: 'utf-8'
      });
      listaContato = JSON.parse(listaContato);
    }

    //cria um array com uma posição
    listaContato.push(infoContato);
    //converter conteudo para json
    listaContato = JSON.stringify(listaContato);
    //salva informações no arquivo
    fs.writeFileSync(fileContato, listaContato);

    res.render('contato', {
      nome,
      email,
      title: 'Contato'
    });
    

  },
  newsletter: (req, res) => {
    let {
      nome,
      email
    } = req.body;
    var date = new Date()
    let infoContatoNesLetter = {
      nome,
      email,
      date
    };
    // caminho e nome do arquivo
    fileNewsLetter = path.join('db', 'newsletter.json');

    let listaNewsLetter = [];

    if (fs.existsSync(fileNewsLetter)) {
      // trazer informações do arquivo
      listaNewsLetter = fs.readFileSync(fileNewsLetter, {
        encoding: 'utf-8'
      });
      listaNewsLetter = JSON.parse(listaNewsLetter);
    }

    //cria um array com uma posição
    listaNewsLetter.push(infoContatoNesLetter);
    //converter conteudo para json
    listaNewsLetter = JSON.stringify(listaNewsLetter);
    //salva informações no arquivo
    fs.writeFileSync(fileNewsLetter, listaNewsLetter);

    res.render('newsletter', {
      nome,
      email,
      title: 'newsletter'
    });

  },

  contatos: (req, res) => {
    fileNewsLetter = path.join('db', 'newsletter.json');
    listaNewsLetter = fs.readFileSync(fileNewsLetter, {
      encoding: 'utf-8'
    });
    listaNewsLetter = JSON.parse(listaNewsLetter);

    fileContatos = path.join('db', 'contatos.json');
    listaContatos = fs.readFileSync(fileContatos, {
      encoding: 'utf-8'
    });
    listaContatos = JSON.parse(listaContatos);




    res.render('contatos', {
      title: 'lista de contatos',
      contatosnewsletter: listaNewsLetter,
      contatos: listaContatos
    })

  },

  cadastro: (req, res) => {

    res.render('cadastro', {
      title: 'cadastro'
    })


  },
  usuario: (req, res) => {

    let {
      nome,
      email,
    } = req.body;

    let senhaEncriptada = bcrypt.hashSync(
      req.body.password
    , 10);


    // novo conteudo
    let infoContato = {
      nome,
      email,
      senhaEncriptada
    };
    // caminho e nome do arquivo
    let fileContato = path.join('db', 'usuarios.json');

    let listaContato = [];

    if (fs.existsSync(fileContato)) {
      // trazer informações do arquivo
      listaContato = fs.readFileSync(fileContato, {
        encoding: 'utf-8'
      });
      listaContato = JSON.parse(listaContato);
    }

    //cria um array com uma posição
    listaContato.push(infoContato);
    //converter conteudo para json
    listaContato = JSON.stringify(listaContato);
    //salva informações no arquivo
    fs.writeFileSync(fileContato, listaContato);

    res.render('cadastro',{title:'usuario'})
  } ,
  login:(req,res)=>{
    res.render('login', {title:'Login'})
  },
  logado:(req,res)=>{
    
    let {email, password} = req.body;

    
    // caminho e nome do arquivo
    fileUsuario = path.join('db', 'usuarios.json');
    listaUsuario = fs.readFileSync(fileUsuario, {encoding: 'utf-8'});
    listaUsuario = JSON.parse(listaUsuario);
    
    listaUsuario.forEach(element => {
      
      if(email == element.email) {

        if(bcrypt.compareSync(password, element.senhaEncriptada)){
          req.session.usuario = element.nome;
          return res.redirect('/painelcontrole');
        }
               
      }
      
    });

    res.render('login', {title: "Login", mensagem: "Usuario incorreto"});

  },

  painelcontrole:(req,res)=>{
    fileUsuario = path.join('db', 'usuarios.json');
    listaUsuario = fs.readFileSync(fileUsuario, {encoding: 'utf-8'});
    listaUsuario = JSON.parse(listaUsuario);

    

    res.render('painelcontrole', {title:'Efemera', usuario:req.session.usuario, listaUsuario})
  },

  validando:(req,res,next)=>{
    
    if(!req.session.usuario){
      res.redirect('/login');
      
  }next();

  
}


};

module.exports = homeController;