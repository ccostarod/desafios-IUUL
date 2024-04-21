import { DateTime } from "luxon";
import { OperationErrors, OperationStatus } from "../controller/OperationCode.js"
import { validaCPF } from "../util/cpf.js"
import Input from "../helpers/Input.js"
import Output from "../helpers/output.js";


class AgendamentoConsultaView {
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
        })
    }

    readData() {
        const hoje = DateTime.now();

        const minDate = DateTime.fromObject({
            year: hoje.year,
            month: hoje.month,
            day: hoje.day,
            hour: 0,
            minute: 0,
            millisecond: 0,
        });

        const dataConsulta = this.#input.readDate(
            'Data da consulta (DDMMAAAA): ',
            'Data inválida. Deve ser maior ou igual a hoje.',
            { min: minDate }
        );

        const horaInicial = this.#input.readTime(
            'Hora de início da consulta (HHMM): ',
            'Hora inválida. Deve ser maior que a hora atual.',
            { min: minDate }
        );

        const horaFinal = this.#input.readTime(
            'Hora do fim da consulta (HHMM): ',
            'Hora inválida. Deve ser maior que a hora inicial.',
            { min: horaInicial }
        );

        const dataHoraInicial = DateTime.fromObject({
            year: dataConsulta.year,
            month: dataConsulta.month,
            day: dataConsulta.day,
            hour: horaInicial.hour,
            minute: horaInicial.minute,
        });

        const dataHoraFinal = DateTime.fromObject({
            year: dataConsulta.year,
            month: dataConsulta.month,
            day: dataConsulta.day,
            hour: horaFinal.hour,
            minute: horaFinal.minute,
        });

        return { dataHoraInicial, dataHoraFinal };
    }

    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine("\nA consulta foi marcada com sucesso!");
        }
        else {
            this.#output.writeLine("\nErro ao marcar a consulta:");
            errors.forEach((error) => {
                this.#output.writeLine(this.#messages.get(error));
            })
        }
    }

    // Mapa de erros:
    #setupMessages() {
        this.#messages.set(
            OperationErrors.PATIENT_NOT_REGISTERED,
            '- Paciente não encontrado.'
        );
        this.#messages.set(
            OperationErrors.ALREADY_SCHEDULED,
            '- Paciente já tem consulta marcada.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_CONFLICT,
            '- Já existe uma consulta agendada nesse horário.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_NOT_REGISTERED,
            '- Data de nascimento inválida. Paciente deve ter ao menos 13 anos.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_DATE_IN_THE_PAST,
            '- Horário da consulta deve ser horário no futuro.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_INITIAL_DATE_AFTER_END_DATE,
            '- Hora inicial deve ser menor que a hora final.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_INITIAL_TIME_INCORRECT,
            '- Hora inicial deve ser marcada de 15 em 15 minutos.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_END_TIME_INCORRECT,
            '- Hora final deve ser marcada de 15 em 15 minutos.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_OUTSIDE_OPENING_HOURS,
            '- Horário de agendamento fora do horário de funcionamento da clínica.'
        );
    }
}
export default AgendamentoConsultaView;