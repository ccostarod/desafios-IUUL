const Paciente = require('../model/Paciente');
const Consulta = require('../model/Consulta');
const Agenda = require('../controller/Agenda');
const Validacao = require('../controller/Validacao')
const readline = require('readline-sync');
const { printTable, Table } = require('console-table-printer');
class Menu {
    constructor(){
        this.agenda = new Agenda();
        this.validacao = new Validacao();
        this.listagemPacientes = [];
        this.listagemConsultas = [];
        this.listagemAgenda = [];
    }
    getMessage(code){
        const messages = {
            'INVALID_CPF_FORMAT': "Erro: Formato de CPF inválido. Tente novamente!",
            'PATIENT_NOT_REGISTERED': "Erro: Paciente não cadastrado!",
            'UNDERAGE_PATIENT': "Erro: Paciente deve ter no minimo 13 anos!",
            'INVALID_DATE_FORMAT': "Erro: Data no formato invalido!",
            'PAST_DATE': "Erro: Essa data ja passou!",
            'INVALID_TIME_FORMAT': "Erro: Hora no formato invalido!",
            'OUT_OF_BUSINESS_HOURS': "Erro: Fora do horario comercial!",
            'EXCEEDED_BUSINESS_HOURS': "Erro: Excedeu o horario comercial!",
            'OUT_OF_ATTENDANCE_MINUTES': "Erro: Fora dos minutos de atendimento!",
            'PATIENT_SCHEDULING': "Erro: Paciente esta agendado!",
            'PATIENT_DELETED_SUCCESSFULLY': "Paciente deletado com sucesso!",
            'PATIENT_MARKED': "Erro: Paciente ja marcado para uma futura consulta!",
            'SCHEDULING_SUCCESSFULLY': "Consulta agendada com sucesso!",
            'CONSULTATION_CANCELED_SUCCESSFULLY': "Consulta cancelada com sucesso!",
            'PASTE_CONSULT': "Erro: Consulta ocorreu no passado!",
            'CONSULT_NOT_FOUND': "Erro: Consulta nao foi encontrada!",
            'TIME_SLOT_TAKEN': "Erro: Ja existe uma consulta nesse horario"
        }
        return messages[code];
    }

    formatarData(data) {
        const partes = data.split("/");
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    start(){
        this.#menuPrincipal();
    }

    #menuPrincipal(){
        let escolha;
        do {
            console.log("Menu Principal");
            console.log("1-Cadastro de pacientes");
            console.log("2-Agenda");
            console.log("3-Fim");
            escolha = readline.question("Escolha: ");
            if (escolha === '1'){
                console.log()
                this.#menuPaciente();
            }
            else if (escolha === '2') {
                console.log()
                this.#menuAgenda();
            }
            else if (escolha === '3'){
                console.log()
                console.log("Encerrando o programa...");
                process.exit();
            }
            console.log("Opção inválida. Por favor, escolha 1, 2 ou 3.");

        } while (escolha !== '1' && escolha !== '2' && escolha !== '3');
    }

    #menuPaciente() {
        let escolha;
        do {
            console.log("Menu do Cadastro de Pacientes");
            console.log("1-Cadastrar novo paciente");
            console.log("2-Excluir paciente");
            console.log("3-Listar pacientes (ordenado por CPF)");
            console.log("4-Listar pacientes (ordenado por nome)");
            console.log("5-Voltar p/ menu principal");
            escolha = readline.question("Escolha: ");
            if (escolha === '1'){
                console.log();
                this.#cadastroPaciente();
            }
            else if (escolha === '2') {
                console.log();
                this.#excluirPaciente();
            }
            else if (escolha === '3'){
                console.log();
                this.#listarPacienteCPF();
            }
            else if (escolha === '4'){
                console.log();
                this.#listarPacientesNome()
            }
            else if (escolha === '5'){
                console.log();
                this.#menuPrincipal();
            }
            else {
                console.log("Opção inválida. Por favor, escolha entre 1 e 5.");
            }
        } while (escolha !== '1' && escolha !== '2' && escolha !== '3' && escolha !== '4' && escolha !== '5');
    }

    #cadastroPaciente(){
        let cpf = readline.question("CPF: ");
        let validacaoCpf = this.validacao.validarCpf(cpf);
        while(!validacaoCpf.status){
            console.log(`\n${this.getMessage(validacaoCpf.errorCode)}\n`);
            cpf = readline.question('CPF: ');
            validacaoCpf = this.validacao.validarCpf(cpf);
        }
        let nome = readline.question("Nome: ");
        while (!this.validacao.validarNome(nome)){
            console.log("\nErro: Nome muito curto! Insira mais do que 5 caracteres!\n");
            nome = readline.question("Nome: ");
        }
        let dataNascimento = readline.question("Data de nascimento: ");
        while (!this.validacao.validarDataNascimento(dataNascimento).status){
            console.log(`\n${this.getMessage(this.validacao.validarDataNascimento(dataNascimento).errorCode)}\n`);
            dataNascimento = readline.question("Data de nascimento: ");
        }

        if (this.agenda.cadastrarPaciente(new Paciente(cpf, nome, this.formatarData(dataNascimento)))){
            console.log(`\nPaciente cadastrado com sucesso!\n`);
            this.#menuPaciente();
        }
        else console.log("\nErro: CPF ja cadastrado!\n");
        this.#menuPaciente();
    }

    #excluirPaciente(){
        let cpf = readline.question("CPF: ");
        let validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda);
        while (!validacaoCpf.status){
            console.log(`\n${this.getMessage(validacaoCpf.errorCode)}\n`);
            cpf = readline.question('CPF: ');
            validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda)
        }
        let resultado = this.agenda.excluirPaciente(cpf);
        if (resultado.status === true){
            console.log(`\n${this.getMessage(resultado.resultCode)}\n`);
        }
        else{
            console.log(`\n${this.getMessage(resultado.errorCode)}\n`);
        }
        this.#menuPaciente();
    }

    #listarPacienteCPF(){
        this.listagemPacientes = this.agenda.listarPacientesPorCPF();
        this.listagemConsultas = this.agenda.listaConsultas;
        if (this.listagemPacientes.length === false || this.listagemPacientes.length === 0){
            console.log("Nenhum Paciente na Agenda!\n");
            this.#menuPaciente();
        }
        function formatarDados(pacientes, consultas) {
            const dadosFormatados = [];
            pacientes.forEach(paciente => {
                const idade = calcularIdade(paciente.dataNascimento);
                dadosFormatados.push({ CPF: paciente.cpf, Nome: paciente.nome, DtNasc: formatarData(paciente.dataNascimento), Idade: idade });
                const consulta = consultas.find(consulta => consulta.cpfPaciente === paciente.cpf);
                if (consulta) {
                    dadosFormatados.push({ Nome: `Consulta agendada para: ${formatarData(consulta.dataConsulta)}`});
                    dadosFormatados.push({ Nome: `${formatarHora(consulta.horaInicial)} as ${formatarHora(consulta.horaFinal)}`});
                }
                dadosFormatados.push({});
            });
            return dadosFormatados;
        }
        
        const dadosFormatados = formatarDados(this.listagemPacientes, this.listagemConsultas);
        
        const table = new Table({
            columns: [
                { name: 'CPF', alignment: 'left', maxLen: 13 },
                { name: 'Nome', alignment: 'left', maxLen: 35 },
                { name: 'DtNasc', alignment: 'left', maxLen: 10 },
                { name: 'Idade', alignment: 'right', maxLen: 3 }
            ]
        });
        
        table.addRows(dadosFormatados);
        table.printTable();
        this.#menuPaciente();
    }

    #listarPacientesNome(){
        this.listagemPacientes = this.agenda.listarPacientesPorNome();
        this.listagemConsultas = this.agenda.listaConsultas;

        if (this.listagemPacientes.length === false || this.listagemPacientes.length === 0){
            console.log("Nenhum Paciente na Agenda!\n");
            this.#menuPaciente();
        }

        function formatarDados(pacientes, consultas) {
            const dadosFormatados = [];
            pacientes.forEach(paciente => {
                const idade = calcularIdade(paciente.dataNascimento);
                dadosFormatados.push({ CPF: paciente.cpf, Nome: paciente.nome, DtNasc: formatarData(paciente.dataNascimento), Idade: idade });
                const consulta = consultas.find(consulta => consulta.cpfPaciente === paciente.cpf);
                if (consulta) {
                    dadosFormatados.push({ Nome: `Consulta agendada para: ${formatarData(consulta.dataConsulta)}`});
                    dadosFormatados.push({ Nome: `${formatarHora(consulta.horaInicial)} as ${formatarHora(consulta.horaFinal)}`});
                }
                dadosFormatados.push({});
            });
            return dadosFormatados;
        }
        
        const dadosFormatados = formatarDados(this.listagemPacientes, this.listagemConsultas);
        
        const table = new Table({
            columns: [
                { name: 'CPF', alignment: 'left', maxLen: 13 },
                { name: 'Nome', alignment: 'left', maxLen: 35 },
                { name: 'DtNasc', alignment: 'left', maxLen: 10 },
                { name: 'Idade', alignment: 'right', maxLen: 3 }
            ]
        });
        
        table.addRows(dadosFormatados);
        table.printTable();
        this.#menuPaciente();
    }

    #menuAgenda() {
        let escolha;
        do {
            console.log("Agenda");
            console.log("1-Agendar consulta");
            console.log("2-Cancelar agendamento");
            console.log("3-Listar agenda");
            console.log("4-Voltar p/ menu principal");
            escolha = readline.question("Escolha: ");
            if (escolha === '1'){
                console.log("\n");
                this.#agendarConsulta();
            }
            else if (escolha === '2') {
                console.log("\n");
                this.#cancelarAgendamento();
            }
            else if (escolha === '3'){
                console.log("\n");
                this.#listarAgenda();
            }
            else if (escolha === '4'){
                console.log("\n");
                this.#menuPrincipal();
            }
            else {
                console.log("Opção inválida. Por favor, escolha entre 1 e 4.");
            }
        } while (escolha !== '1' && escolha !== '2' && escolha !== '3' && escolha !== '4');
    }

    #agendarConsulta(){
        let cpf = readline.question('CPF: ');
        let validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda);
        while (!validacaoCpf.status){
            console.log(`\n${this.getMessage(validacaoCpf.errorCode)}\n`);
            cpf = readline.question('CPF: ');
            validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda)
        }
        let dataConsulta = readline.question('Data da consulta: ');
        while (!this.validacao.validarData(dataConsulta)){
            console.log("\nFormato de data inserido eh invalido!\n");
            dataConsulta = readline.question('Data da consulta: ');
        }
        let horaInicial = readline.question('Hora inicial: ');
        while (!this.validacao.validarDataConsulta(dataConsulta, horaInicial).status){
            console.log(`\n${this.getMessage(this.validacao.validarDataConsulta(dataConsulta, horaInicial).errorCode)}\n`);
            dataConsulta = readline.question('Data da consulta: ');
            horaInicial = readline.question('Hora inicial: ');
        }
        while (!this.validacao.validarHora(horaInicial).status){
            console.log(`\n${this.getMessage(this.validacao.validarHora(horaInicial).errorCode)}\n`);
            horaInicial = readline.question('Hora inicial: ');
        }
        let horaFinal = readline.question('Hora final: ');
        while (!this.validacao.validarHora(horaFinal).status){
            console.log(`\n${this.getMessage(this.validacao.validarHora(horaFinal).errorCode)}\n`);
            horaFinal = readline.question('Hora final: ');
        }

        while(!this.validacao.compararHoras(horaInicial, horaFinal)){
            console.log("\nErro: Hora final é menor do que a hora inicial!\n");
            horaInicial = readline.question('Hora inicial: ');
            horaFinal = readline.question('Hora final: ');
        }
        let resultado = this.agenda.agendarConsulta(new Consulta(this.agenda.acharPaciente(cpf), this.formatarData(dataConsulta), horaInicial, horaFinal));

        if (resultado.status) {
            console.log(`\n${this.getMessage(resultado.resultCode)}\n`);
        } else {
            console.log(`\n${this.getMessage(resultado.errorCode)}\n`);
        }
        this.#menuAgenda();
    }

    #cancelarAgendamento(){
        let cpf = readline.question('CPF: ');
        let validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda);
        while (!validacaoCpf.status){
            console.log(`\n${this.getMessage(validacaoCpf.errorCode)}\n`);
            cpf = readline.question('CPF: ');
            validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda);
        }
        let dataConsulta = readline.question('Data da consulta: ');
        while (!this.validacao.validarData(dataConsulta)){
            console.log("\nFormato de data inserido eh invalido!\n");
            dataConsulta = readline.question('Data da consulta: ');
        }
        let horaInicial = readline.question('Hora inicial: ');
        while (!this.validacao.validarHora(horaInicial).status){
            console.log(`\n${this.getMessage(this.validacao.validarHora(horaInicial).errorCode)}\n`);
            horaInicial = readline.question('Hora inicial: ');
        }

        let resultado = this.agenda.cancelarAgendamento(this.agenda.acharConsulta(cpf, this.formatarData(dataConsulta), horaInicial));
        if (resultado.status){
            console.log(`\n${this.getMessage(resultado.resultCode)}\n`);
        }
        else{
            console.log(`\n${this.getMessage(resultado.errorCode)}\n`);
        }
        this.#menuAgenda();

    }

    #listarAgenda(){
        let escolhaDaListagem;
        do {
            escolhaDaListagem = readline.question("Apresentar a Agenda T-Toda ou P-Periodo: ");
            if (escolhaDaListagem === 'T'){
                this.#listarAgendaToda();
            }
            else if (escolhaDaListagem === 'P'){
                let dataInicial = readline.question("Data inicial: ");
                while(!this.validacao.validarData(dataInicial)){
                    console.log("\nFormato de data inserido eh invalido!\n");
                    dataInicial = readline.question('Data inicial: ');
                }
                let dataFinal = readline.question("Data final: ");
                while(!this.validacao.validarData(dataFinal)){
                    console.log("\nFormato de data inserido eh invalido!\n");
                    dataFinal = readline.question('Data inicial: ');
                }
                this.#listarAgendaPorPeriodo(this.formatarData(dataInicial), this.formatarData(dataFinal));
            }
        } 
        while (escolhaDaListagem !== 'T' && escolhaDaListagem !== 'P');
    }

    #listarAgendaToda(){
        const consultas = this.agenda.listarAgenda();
        if (consultas){
            const tabela = consultas.flatMap((consulta, index, array) => {
                const primeiraConsulta = index === 0 || consulta.dataConsulta !== array[index - 1].dataConsulta;
                return {
                    'Data consulta': primeiraConsulta ? formatarData(consulta.dataConsulta) : '',
                    'H. Inicial': formatarHora(consulta.horaInicial),
                    'H. Final': formatarHora(consulta.horaFinal),
                    'Nome': this.agenda.acharPaciente(consulta.cpfPaciente).nome,
                    'Dt. de Nascimento': formatarData(this.agenda.acharPaciente(consulta.cpfPaciente).dataNascimento)
                };
            });
            printTable(tabela);
            this.#menuAgenda();
        }
        console.log("Erro ao apresentar lista de consultas, veja se ela nao esta vazia!");
        this.#menuAgenda();
    }

    #listarAgendaPorPeriodo(data1, data2){
        const consultas = this.agenda.listarAgenda();
        if (consultas){
            const consultasFiltradas = consultas.filter(consulta => {
                const dataConsulta = new Date(consulta.dataConsulta);
                return dataConsulta >= new Date(data1) && dataConsulta <= new Date(data2);
            });

            if (consultasFiltradas.length === 0) {
                console.log("Não há consultas entre as datas informadas.");
                this.#menuAgenda();
                return;
            }

            const tabela = consultasFiltradas.flatMap((consulta, index, array) => {
                const primeiraConsulta = index === 0 || consulta.dataConsulta !== array[index - 1].dataConsulta;
                return {
                    'Data consulta': primeiraConsulta ? formatarData(consulta.dataConsulta) : '',
                    'H. Inicial': formatarHora(consulta.horaInicial),
                    'H. Final': formatarHora(consulta.horaFinal),
                    'Nome': this.agenda.acharPaciente(consulta.cpfPaciente).nome,
                    'Dt. de Nascimento': formatarData(this.agenda.acharPaciente(consulta.cpfPaciente).dataNascimento)
                };
            });
            printTable(tabela);
            this.#menuAgenda();
        } else {
            console.log("Erro ao apresentar lista de consultas, veja se ela nao esta vazia!");
            this.#menuAgenda();
        }
    }


}
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}
function formatarHora(hora) {
    const horas = hora.substring(0, 2);
    const minutos = hora.substring(2, 4);
    return `${horas}:${minutos}`;
}
function formatarData(data) {
    const partesData = data.split('-');
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
}

module.exports = Menu;