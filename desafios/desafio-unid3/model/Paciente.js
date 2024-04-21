import { DateTime } from "luxon";
import { OperationErrors } from "../controller/OperationCode.js";
import { validaCPF } from '../util/cpf.js';
import Agenda from './Agenda.js';

class Paciente {
    #agenda
    #cpf;
    #nome;
    #dataNascimento;

    constructor(cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
        this.#agenda = new Agenda();
    }

    static create(cpf, nome, dataNascimento){
        const errors = []; 

        //validacoes:
        if (!validaCPF(cpf)){
            errors.push(OperationErrors.INVALID_PATIENT_DOCUMENT);
        }
        else if (nome.length < 5 ) {
            errors.push(OperationErrors.INVALID_PATIENT_NAME);
        }
        else if (dataNascimento > DateTime.now().minus( { year: 13 } )){
            errors.push(OperationErrors.INVALID_PATIENT_BIRTHDATE);
        }

        return errors.length === 0
            ? { success: new Paciente(cpf, nome, dataNascimento) }
            : { failure: errors };
    }



    get cpf() {
        return this.#cpf;
    }
    
    get nome() {
        return this.#nome;
    }
    
    get dataNascimento() {
        return this.#dataNascimento;
    }

    get agenda() {
        return this.#agenda;
    }

    addAgendamento(agendamento) {
        this.#agenda.add(agendamento);
    }

    removeAgendamento(agendamento) {
        const ok = this.#agenda.remove(agendamento);

        if (ok) {
            agendamento.removed();
        }
    }

    hasAgendamentoFuturo() {
        this.#agenda.hasAgendamentoFuturo();
    }

    agendamentoFuturo() {
        this.#agenda.agendamentoFuturo();
    }

    equals = (obj) => obj.#cpf && obj.#cpf === this.#cpf;
}
export default Paciente;
