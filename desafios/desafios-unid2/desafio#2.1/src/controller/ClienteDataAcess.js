const fs = require('fs');
const path = require('path');
const luxon = require('luxon');

class ClienteDataAccess {
    lerArquivoEntrada(caminho) {
        try {
            const dados = fs.readFileSync(caminho, 'utf8');
            return JSON.parse(dados);
        } catch (erro) {
            throw new Error('Erro ao ler o arquivo de entrada: ' + erro.message);
        }
    }

    gerarArquivoSaida(caminho, erros) {
        const caminhoSaida = path.join(path.dirname(caminho), `erros-${luxon.DateTime.now().toFormat('ddMMyyyy-HHmmss')}.json`);
        try {
            fs.writeFileSync(caminhoSaida, JSON.stringify(erros, null, 2));
        } catch (erro) {
            console.error('Erro ao gerar o arquivo de saída:', erro);
            process.exit(1);
        }
    }
}

module.exports = ClienteDataAccess;