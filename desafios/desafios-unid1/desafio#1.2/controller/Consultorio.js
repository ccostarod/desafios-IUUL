const Paciente = require('../model/Paciente');
const Consulta = require('../model/Consulta');

class Consultorio {
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

    

}