const Paciente = require('../model/Paciente');
const Consulta = require('../model/Consulta');

class Agenda {
    #listaPacientes;
    #listaConsultas;

    constructor() {
        this.#listaPacientes = [];
        this.#listaConsultas = [];
    }

    get listaPacientes() {
        return this.#listaPacientes;
    }

    get listaConsultas() {
        return this.#listaConsultas;
    }

    cadastrarPaciente(paciente){ 
        if (this.#listaPacientes.some(x => x.cpf === paciente.cpf)) {
            return false;
        }   
        this.#listaPacientes.push(paciente);
        return true;
    }

    excluirPaciente(cpf){
        if (this.#listaPacientes.some(x => x.cpf === cpf)){ 
            if (this.#listaConsultas.some(x => x.cpfPaciente === cpf)){
                let consultasPassadas = [];
                for (let consulta of this.#listaConsultas) {
                    let resultado = this.#compararDatas(consulta);
                    if (consulta.cpfPaciente === cpf && resultado === 1){
                        return false;
                    }
                    else if(consulta.cpfPaciente === cpf && resultado === -1){
                        consultasPassadas.push(consulta);
                    }
                }
                this.#listaConsultas = this.#listaConsultas.filter(consulta => !consultasPassadas.includes(consulta));
            }
            this.#listaPacientes = this.#listaPacientes.filter(x => x.cpf !== cpf);
            return true;
        }
        return false;
    }

    

    agendarConsulta(consulta){
        if (this.#listaPacientes.some(paciente => paciente.cpf === consulta.cpfPaciente)){
            if (this.#listaConsultas.some(x => x.cpfPaciente === consulta.cpfPaciente)){
                for (let x of this.#listaConsultas) {
                    let resultado = this.#compararDatas(x);
                    if (x.cpfPaciente === consulta.cpfPaciente && resultado === 1){
                        return false;
                    }
                }
            }
            this.#listaConsultas.push(consulta);
            return true;
        }
        return false; 
    }

    cancelarAgendamento(consulta){
        if (this.#listaConsultas.some(x=> x === consulta)){
            let resultado = this.#compararDatas(consulta);
            if (resultado === 1){
                this.#listaConsultas = this.#listaConsultas.filter(x => x !== consulta);
                return true;
            }
            return false;
        }
        return false;
    }

    listarPacientesPorCPF(){}

    listarPacientesPorNome(){}

    listarAgenda(){}

    #compararDatas(consulta) {
        let dataConsulta = consulta.dataConsulta.toISOString().split('T')[0];
        let dataAtual = new Date().toISOString().split('T')[0];
    
        if (dataConsulta > dataAtual) {
            return 1; // data da consulta é no futuro
        } else if (dataConsulta < dataAtual) {
            return -1; // data da consulta é no passado
        } else {
            let horasConsulta = parseInt(consulta.horaInicial.substring(0,2));
            let minutosConsulta = parseInt(consulta.horaInicial.substring(2));  
            let horasAtual = new Date().getHours();
            let minutosAtual = new Date().getMinutes();
    
            if (horasConsulta < horasAtual || (horasConsulta === horasAtual && minutosConsulta < minutosAtual)) {
                return -1; 
            } else {
                return 1;
            }
        }
    }

    acharPaciente(cpf){ //Vai ser usada para pegar um objeto Paciente (Usado ao agendar consulta).
        return this.#listaPacientes.find(x => x.cpf === cpf);
    }

    acharConsulta(cpf, dataConsulta, horaInicial){ //Vai ser usado para pegar um objeto Consulta (Usado no cancelamento)
        return this.#listaConsultas.find(x => x.cpfPaciente === cpf && x.dataConsulta === dataConsulta && x.horaInicial === horaInicial);
    }
}