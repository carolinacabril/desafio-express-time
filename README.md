# desafio-express-time-1

## Projeto alterado em aula

### DESAFIO 1
- CRIAR REPOSITÓRIO NO GITHUB COM NOME DO TIME (desafio-express-time-1)
    - Cadastro de usuário com senha criptografada (hashing)
    - crie uma nova rota e uma nova view para o cadastro de usuario
    - na view cadastroUsuario.ejs, deve ter um formulário com campos nome, email e senha
    - salve as informações do usuario em um arquivo usuarios.json

### DESAFIO 2:
- Login com session e middleware:
    - crie uma nova rota e uma nova view para o login de usuário
    - na view login.ejs, deve ter um formulário com campos email e senha

### DESAFIO 3:
- Exibir usuários cadastrados no painel de controle e utilizar middleware na rota:
    - somente usuarios logados podem acessar o painel de controle
    - caso um usuário não logado acesse a rota /admin, deve ser redirencionado para pagina de login
    - no painel de controle, exiba as usuários cadastrados (nome, email e foto)
