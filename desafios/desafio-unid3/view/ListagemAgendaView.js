import { DateTime } from "luxon";
import Input from "../helpers/Input.js";
import Output from "../helpers/output.js";

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
        this.#input.readChar(
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

    listAgenda(agenda) {
        if (agenda.length === 0) {
            this.#output.writeLine('\nNão existem consultas agendadas');
        }
        else {
            const headers = ['Data', 'H.Ini', 'H.Fim', 'Tempo', 'Nome', 'Dt.Nasc.'];
            const rows = agenda.map((a) => {
                const duracao = a.dataHoraFim.diff(a.dataHoraInicio);
                
                return [
                    a.dataHoraInicio.toLocaleString(DateTime.DATE_SHORT),
                    a.dataHoraInicio.toLocaleString(DateTime.TIME_SIMPLE),
                    a.dataHoraFim.toLocaleString(DateTime.TIME_SIMPLE),
                    duracao.toFormat('hh:mm'),
                    a.paciente.nome,
                    a.paciente.dtNascimento.toLocaleString(DateTime.DATE_SHORT)
                ];
            });

            this.#output.writeTable(headers, rows);
        }
    }
}

export { ListagemAgendaView, Period };