let express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController')
/* GET home page. */
router.get('/',homeController.index);

router.post('/contato', homeController.contato);

router.post('/newsletter',homeController.newsletter);

router.get('/listar-contatos',homeController.contatos)

router.get('/cadastro',homeController.cadastro)

router.post('/cadastro',homeController.usuario)

router.get('/login',homeController.login)

router.post('/login',homeController.logado)

router.get('/painelcontrole',homeController.validando,homeController.painelcontrole)

module.exports = router;
