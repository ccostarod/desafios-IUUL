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
            console.log(`\n${validacaoCpf.message}\n`);
            cpf = readline.question('CPF: ');
            validacaoCpf = this.validacao.validarCpf(cpf);
        }
        let nome = readline.question("Nome: ");
        while (!this.validacao.validarNome(nome)){
            console.log("Erro: Nome muito curto! Insira mais do que 5 caracteres!");
            nome = readline.question("Nome: ");
        }
        let dataNascimento = readline.question("Data de nascimento: ");
        while (!this.validacao.validarDataNascimento(dataNascimento).status){
            console.log(`\n${this.validacao.validarDataNascimento(dataNascimento).message}\n`);
            dataNascimento = readline.question("Data de nascimento: ");
        }

        if (this.agenda.cadastrarPaciente(new Paciente(cpf, nome, this.formatarData(dataNascimento)))){
            console.log(`\nPaciente cadastrado com sucesso!\n`);
            console.log(this.agenda.listaPacientes);
            this.#menuPaciente();
        }
        else console.log("\nErro: CPF ja cadastrado!\n");
        this.#menuPaciente();
    }

    #excluirPaciente(){
        let cpf = readline.question("CPF: ");
        let validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda);
        while (!validacaoCpf.status){
            console.log(`\n${validacaoCpf.message}\n`);
            cpf = readline.question('CPF: ');
            validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda)
        }
        let resultado = this.agenda.excluirPaciente(cpf);
        if (resultado.status){
            console.log(`\n${resultado.message}\n`);
        }
        else{
            console.log(`\n${resultado.message}\n`);
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
            console.log(`\n${validacaoCpf.message}\n`);
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
            console.log(`\n${this.validacao.validarDataConsulta(dataConsulta, horaInicial).message}\n`);
            dataConsulta = readline.question('Data da consulta: ');
            horaInicial = readline.question('Hora inicial: ');
        }
        while (!this.validacao.validarHora(horaInicial).status){
            console.log(`\n${this.validacao.validarHora(horaInicial).message}\n`);
            horaInicial = readline.question('Hora inicial: ');
        }
        let horaFinal = readline.question('Hora final: ');
        while (!this.validacao.validarHora(horaFinal).status){
            console.log(`\n${this.validacao.validarHora(horaFinal).message}\n`);
            horaFinal = readline.question('Hora final: ');
        }

        while(!this.validacao.compararHoras(horaInicial, horaFinal)){
            console.log("\nErro: Hora final é menor do que a hora inicial!\n");
            horaInicial = readline.question('Hora inicial: ');
            horaFinal = readline.question('Hora final: ');
        }
        let resultado = this.agenda.agendarConsulta(new Consulta(this.agenda.acharPaciente(cpf), this.formatarData(dataConsulta), horaInicial, horaFinal));
        console.log(`\n${resultado.message}\n`)
        this.#menuAgenda();
    }

    #cancelarAgendamento(){
        let cpf = readline.question('CPF: ');
        let validacaoCpf = this.validacao.validarCpfConsultaOuExclusao(cpf, this.agenda);
        while (!validacaoCpf.status){
            console.log(`\n${validacaoCpf.message}\n`);
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
            console.log(`\n${this.validacao.validarHora(horaInicial).message}\n`);
            horaInicial = readline.question('Hora inicial: ');
        }

        let resultado = this.agenda.cancelarAgendamento(this.agenda.acharConsulta(cpf, this.formatarData(dataConsulta), horaInicial));
        if (resultado.status){
            console.log(`\n${resultado.message}\n`);
        }
        else{
            console.log(`\n${resultado.message}\n`);
        }
        this.#menuAgenda();

    }

    #listarAgenda(){
        //Fazer
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
