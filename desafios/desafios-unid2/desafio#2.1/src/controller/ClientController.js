const ClienteDataAccess = require('./ClienteDataAcess');
const ValidacaoCliente = require('../model/validationClient');
const ErrorViewer = require('../view/ErrorView');

class ClienteController {
    constructor(caminhoArquivo) {
        this.dataAccess = new ClienteDataAccess();
        try {
            this.clientes = this.dataAccess.lerArquivoEntrada(caminhoArquivo);
        } catch (erro) {
            console.error(erro.message);
            process.exit(1);
        }
    }

    validateAndDisplayErrors() {
        const validador = new ValidacaoCliente();
        const erros = [];

        for (const cliente of this.clientes) {
            const viewer = new ErrorViewer(cliente);
            const errorsCliente = viewer.viewErrors();
            if (errorsCliente.length > 0) erros.push({ cliente, errors: errorsCliente });
        }

        this.dataAccess.gerarArquivoSaida('./files/saida.json', erros);
    }
}

module.exports = ClienteController;