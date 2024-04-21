import { DateTime } from "luxon";
import { OperationErrors, OperationStatus } from "../controller/OperationCode.js";
import { validaCPF } from "../util/cpf.js";
import Input from "../helpers/Input.js";
import Output from "../helpers/output.js";

class CancelamentoConsultaView {
    #input;
    #output;
    #messages;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
        this.#messages = new Map();

        this.#setupMessages();
    }

    readCPF() {
        this.#input.readInteger('CPF: ', 'CPF inválido', {
            min: 111111111,
            max: 99999999999,
            isValid: validaCPF,
        });
    }

    readData() {
        const hoje = DateTime.now();

        const minDate = DateTime.fromObject({
            year: hoje.year,
            month: hoje.month,
            day: hoje.day,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        });

        const dataConsulta = this.#input.readDate(
            'Data da consulta (DDMMAAAA): ',
            'Data inválida, deve ser maior ou igual a hoje.',
            { min: minDate },
        );

        const horaInicial = this.#input.readTime(
            'Hora de início da consulta (HHMM): ',
            'Hora inválida, deve ser maior que a hora atual.',
            { min: minDate },
        );

        const dataHoraInicio = DateTime.fromObject({
            year: dataConsulta.year,
            month: dataConsulta.month,
            day: dataConsulta.day,
            hour: horaInicial.hour,
            minute: horaInicial.minute,
        });

        return { dataHoraInicio };
    }

    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine('\nConsulta desmarcada com sucesso!');
        }
        else {
            this.#output.writeLine('\nErro na desmarcação: ');
            errors.forEach((error) => {
                this.#output.writeLine(this.#messages.get(error));
            })
        }
    }

    #setupMessages() {
        this.#messages.set(
            OperationErrors.PATIENT_NOT_REGISTERED,
            '- Paciente não encontrado.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_NOT_REGISTERED,
            '- Agendamento da consulta não encontrado.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_DATE_IN_THE_PAST,
            '- Horário da consulta deve ser um horário no futuro.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_NOT_BELONG_PATIENT,
            '- Horário da consulta está marcado para outro paciente.'
        );
    }
}
export default CancelamentoConsultaView;