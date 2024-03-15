const Paciente = require('./Paciente');

class Consulta {
    #paciente;
    #dataConsulta; 
    #horaInicial;
    #horaFinal; 

    constructor(paciente, dataConsulta, horaInicial, horaFinal) {
        this.#paciente = paciente;
        this.#dataConsulta = dataConsulta;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
    }

    get cpfPaciente() {
        return this.#paciente.cpf;
    }
    set cpfPaciente(cpfPaciente) {
        this.#paciente.cpf = cpfPaciente;
    }

    get dataConsulta() {
        return this.#dataConsulta;
    }
    set dataConsulta(dataConsulta) {
        this.#dataConsulta = dataConsulta;
    }

    get horaInicial() {
        return this.#horaInicial;
    }
    set horaInicial(horaInicial) {
        this.#horaInicial = horaInicial;
    }

    get horaFinal() {
        return this.#horaFinal;
    }
    set horaFinal(horaFinal) {
        this.#horaFinal = horaFinal;
    }

    toString() {
        return `Consulta: \n
                Paciente CPF: ${this.#paciente.cpf} \n
                Data da Consulta: ${this.#dataConsulta} \n
                Hora Inicial: ${this.#horaInicial.substring(0,2) + ":" + this.#horaInicial.substring(2)} \n
                Hora Final: ${this.#horaFinal.substring(0,2) + ":" + this.#horaFinal.substring(2)}`;
    }
}
module.exports = Consulta;