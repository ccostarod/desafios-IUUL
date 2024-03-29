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
                        return {status: false, errorCode: "PATIENT_SCHEDULING"};
                    }
                    else if(consulta.cpfPaciente === cpf && resultado === -1){
                        consultasPassadas.push(consulta);
                    }
                }
                this.#listaConsultas = this.#listaConsultas.filter(consulta => !consultasPassadas.includes(consulta));
            }
            this.#listaPacientes = this.#listaPacientes.filter(x => x.cpf !== cpf);
            return {status: true, resultCode: "PATIENT_DELETED_SUCCESSFULLY"};
        }
        return {status: false, errorCode: "PATIENT_NOT_REGISTERED"};
    }


    agendarConsulta(consulta){
        if (this.#listaPacientes.some(paciente => paciente.cpf === consulta.cpfPaciente)){
            if (this.#listaConsultas.some(x => x.cpfPaciente === consulta.cpfPaciente)){
                for (let x of this.#listaConsultas) {
                    let resultado = this.#compararDatas(x);
                    if (x.cpfPaciente === consulta.cpfPaciente && resultado === 1){
                        return {status: false, errorCode: "PATIENT_MARKED"}; 
                    }
                }
            }
            for (let x of this.#listaConsultas) {
                if (x.dataConsulta === consulta.dataConsulta && 
                    ((x.horaInicial <= consulta.horaInicial && consulta.horaInicial < x.horaFinal) || 
                    (x.horaInicial < consulta.horaFinal && consulta.horaFinal <= x.horaFinal))) {
                    return {status: false, errorCode: "TIME_SLOT_TAKEN"};
                }
            }
            this.#listaConsultas.push(consulta);
            return {status: true, resultCode: "SCHEDULING_SUCCESSFULLY"};
        }
        return {status: false, errorCode: "PATIENT_NOT_REGISTERED"}; 
    }

    cancelarAgendamento(consulta){
        if (this.#listaConsultas.some(x=> x === consulta)){
            let resultado = this.#compararDatas(consulta);
            if (resultado === 1){
                this.#listaConsultas = this.#listaConsultas.filter(x => x !== consulta);
                return { status: true, resultCode: "CONSULTATION_CANCELED_SUCCESSFULLY" };
            }
            return { status: false, errorCode: "PASTE_CONSULT" };
        }
        return { status: false, errorCode: "CONSULT_NOT_FOUND" };
    }

    listarPacientesPorCPF(){
        let listaOrdenada = [...this.listaPacientes]; 
        if (listaOrdenada.length > 0 || listaOrdenada !== false){
            listaOrdenada.sort((a, b) => a.cpf.localeCompare(b.cpf));
            return listaOrdenada;
        }
        return false;
    }

    listarPacientesPorNome() {
        let aux;
        if (this.listaPacientes.length > 0 || this.listaPacientes !== false){
            for (let i = 0; i < this.listaPacientes.length; i++) {
                for (let j = i + 1; j < this.listaPacientes.length; j++) {
                    if (this.listaPacientes[i].nome > this.listaPacientes[j].nome) {
                        aux = this.listaPacientes[i];
                        this.listaPacientes[i] = this.listaPacientes[j];
                        this.listaPacientes[j] = aux;
                    }
                }
            }
            return this.#listaPacientes;
        }
        return false;
    }
    listarAgenda(){
        if (this.#listaConsultas){
            return this.#listaConsultas.sort((a, b) => new Date(a.dataConsulta) - new Date(b.dataConsulta));
        }
        return false;
    }

    listarAgendaPorPeriodo(data1, data2){
        
    }

    #compararDatas(consulta) {
        let dataConsulta = consulta.dataConsulta;
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
module.exports = Agenda;
