import { DateTime } from "luxon";
import { formataCPF } from "../util/cpf.js";
import Output from "../helpers/output.js";
import Session from "../session/Session.js";

class ListagemPacientesView {
    #output;

    constructor() {
        this.#output = new Output();
    }

    async listPacientes(pacientes) {
        pacientes = pacientes.map(p => p.toJSON());
        if (pacientes.length === 0) {
            this.#output.writeLine('\nNão existem pacientes cadastrados');
        } else {
            const headers = ['CPF', 'Nome', 'Data de Nascimento', 'Agendamentos'];
            const rows = await Promise.all(pacientes.map(async p => {
                const agendamento = await Session.Consultorio.agenda.agendamentoFuturo(p);
                const agendamentos =  agendamento ?
                    `Agendado para ${agendamento.data}\n` +
                    `${agendamento.horaInicio} às ` +
                    `${agendamento.horaFim}` : 'Sem agendamento futuro';
                return [
                    formataCPF(p.cpf),
                    p.name,
                    p.dataNascimento,
                    agendamentos
                ];
            }));

            this.#output.writeTable(headers, rows);
        }
    }
}

export default ListagemPacientesView;