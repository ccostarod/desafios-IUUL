const Paciente = require('./Paciente');

class Consulta {
    #cpfPaciente;
    #dataConsulta;
    #horaInicial;
    #horaFinal;

    constructor(cpfPaciente, dataConsulta, horaInicial, horaFinal) {
        this.#cpfPaciente = cpfPaciente;
        this.#dataConsulta = dataConsulta;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
    }

    get cpfPaciente() {
        return this.#cpfPaciente;
    }
    set cpfPaciente(cpfPaciente) {
        this.#cpfPaciente = cpfPaciente;
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