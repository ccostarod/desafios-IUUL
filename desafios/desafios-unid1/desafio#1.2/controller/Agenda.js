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
                this.#listaConsultas.forEach(consulta => {
                    let dataConsulta = consulta.dataConsulta.toISOString().split('T')[0];
                    let dataAtual = new Date().toISOString().split('T')[0];
                    if (consulta.cpfPaciente === cpf && dataConsulta > dataAtual){
                        return false;
                    }
                    else if(consulta.cpfPaciente === cpf && dataConsulta < dataAtual){
                        consultasPassadas.push(consulta);
                    }
                    else if(consulta.cpfPaciente === cpf && dataConsulta === dataAtual){
                        horasConsulta = parseInt(consulta.horaInicial.substring(0,2));
                        minutosConsulta = parseInt(consulta.horaInicial.substring(2));  
                        horasAtual = new Date().getHours();
                        minutosAtual = new Date().getMinutes();

                        if (horasConsulta < horasAtual || (horasConsulta === horasAtual && minutosConsulta < minutosAtual)){
                            consultasPassadas.push(consulta);
                        }
                        else 
                            return false;
                    }

                });
                this.#listaConsultas = this.#listaConsultas.filter(consulta => !consultasPassadas.includes(consulta));
            }
            this.#listaPacientes = this.#listaPacientes.filter(x => x.cpf !== cpf);
            return true;
        }
        return false;
    }

    acharPaciente(cpf){
        return this.#listaPacientes.find(x => x.cpf === cpf);
    }

    agendarConsulta(Consulta){
        
    }
}