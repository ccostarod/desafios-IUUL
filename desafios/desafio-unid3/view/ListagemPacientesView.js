import { DateTime } from "luxon";
import { formataCPF } from "../model/Paciente";
import Output from "../helpers/output";

class ListagemPacientesView {
    #output;

    constructor() {
        this.#output = new Output();
    }

    listPacientes(pacientes) {
        if (pacientes.length === 0) {
            this.#output.writeLine('\nNão existem pacientes cadastrados');
        } else {
            const headers = ['CPF', 'Nome', 'Data de Nascimento', 'Agendamentos'];
            const rows = pacientes.map(p => {
                const agendamentos = p.agenda.iterator().map(a =>
                    `Agendado para ${a.dataHoraInicio.toLocaleString(DateTime.DATE_SHORT)}\n` +
                    `${a.dataHoraInicio.toLocaleString(DateTime.TIME_SIMPLE)} às ` +
                    `${a.dataHoraFim.toLocaleString(DateTime.TIME_SIMPLE)}`
                ).join('\n');

                return [
                    formataCPF(p.cpf),
                    p.nome,
                    p.dtNascimento.toLocaleString(DateTime.DATE_SHORT),
                    agendamentos
                ];
            });

            this.#output.writeTable(headers, rows);
        }
    }
}

export default ListagemPacientesView;