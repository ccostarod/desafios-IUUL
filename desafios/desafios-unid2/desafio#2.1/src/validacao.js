const ClienteController = require('./controller/ClientController');

const caminhoArquivo = process.argv[2];
const controller = new ClienteController(caminhoArquivo);

controller.validateAndDisplayErrors();