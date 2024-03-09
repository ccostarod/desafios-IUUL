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
        const pacienteExcluido = this.#listaPacientes.find(x => x.cpf === cpf);
        if (pacienteExcluido){
            if (this.#listaConsultas.some(x => x.cpfPaciente === cpf)){
                return false;
            }
            this.#listaPacientes = this.#listaPacientes.filter(x => x === pacienteExcluido);
            return true;
        }
        return false;
    }

    
}