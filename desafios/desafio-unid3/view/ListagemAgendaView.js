import { DateTime } from "luxon";
import Input from "../helpers/Input.js";
import Output from "../helpers/output.js";
import PacienteService from "../database/services/PacienteService.js";
import moment from 'moment';

class Period {
    static get ALL() {
        return 'T';
    }
    static get PARTIAL() {
        return 'P';
    }
}

class ListagemAgendaView {
    #input;
    #output;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
    }

    readOption() {
        return this.#input.readChar(
            'Apresentar a agenda T-Toda ou por P-Periodo: ',
            'Digite [T ou P].',
            { validChars: 'TP', capitalize: true}
        );
    }

    readPeriod() {
        const dataInicio = this.#input.readDate(
            'Data inicial (DDMMAAAA): ',
            'Data invalida.'
        );
        let dataFim = this.#input.readDate(
            'Data final (DDMMAAAA): ',
            'Data invalida.',
            { min: dataInicio }
        );

        //Definindo a hora, minuto e segundo da dataFim
        dataFim = DateTime.fromObject({
            year: dataFim.year,
            month: dataFim.month,
            day: dataFim.day,
            hour: 23,
            minute: 59,
            second: 59,
        })

        return { dataInicio, dataFim };
    }

    async listAgenda(agenda) {
        if (agenda.length === 0) {
            this.#output.writeLine('\nNão existem consultas agendadas');
        }
        else {
            const headers = ['Data', 'H.Ini', 'H.Fim', 'Tempo', 'Nome', 'Dt.Nasc.'];
            const rows = await Promise.all(agenda.map(async (a) => {
                const hrInicial = moment(a.horaInicio, 'HH:mm:ss');
                const hrFinal = moment(a.horaFim, 'HH:mm:ss');
                const duracao = moment.duration(hrFinal.diff(hrInicial));
                const duracaoFormatada = `${Math.floor(duracao.asHours())}:${duracao.minutes()}`;
                const paciente = await PacienteService.getPacienteById(a.pacienteId);
                return [
                    a.data,
                    a.horaInicio,
                    a.horaFim,
                    duracaoFormatada,
                    paciente.name,
                    paciente.dataNascimento,
                ];
            }));

            this.#output.writeTable(headers, rows);
        }
    }
}

export { ListagemAgendaView, Period };