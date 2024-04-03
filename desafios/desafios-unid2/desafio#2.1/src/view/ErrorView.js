const ValidacaoCliente = require('../model/validationClient');
class ErrorViewer {
    constructor(cliente) {
        this.cliente = cliente;
    }

    viewErrors() {
        const validador = new ValidacaoCliente();
        const errors = [];

        const nomeError = validador.validaNome(this.cliente.nome);
        if (nomeError) errors.push(nomeError);

        const cpfError = validador.validaCPF(this.cliente.cpf);
        if (cpfError) errors.push(cpfError);

        const dataNascimentoError = validador.validaDataNascimento(this.cliente.dt_nascimento);
        if (dataNascimentoError) errors.push(dataNascimentoError);

        const rendaMensal = parseFloat(this.cliente.renda_mensal.replace(',', '.'));
        const rendaMensalError = validador.validaRendaMensal(rendaMensal);
        if (rendaMensalError) errors.push(rendaMensalError);

        const estadoCivilError = validador.validaEstadoCivil(this.cliente.estado_civil);
        if (estadoCivilError) errors.push(estadoCivilError);

        return errors;
    }
}

module.exports = ErrorViewer;