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
}