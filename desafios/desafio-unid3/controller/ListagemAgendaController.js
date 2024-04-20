import { Session } from "../session/Session";

class ListagemAgendaController {
    agenda() {
        this.#getAgenda(Session.Consultorio.agenda.iterator());
    }

    agendaPeriod(inicio, fim) {
        this.#getAgenda(Session.Consultorio.agenda.iteratorPeriod(inicio, fim));
    } 

    #getAgenda(iterator) {
        const agendamentos = []

        for (const a of iterator) {
            agendamentos.push(a);
        }

        agendamentos.sort(
            (a, b) => a.dataHoraInicio.toMillis() - b.dataHoraInicio.toMillis()
        );

        return agendamentos;
    }
}

export default ListagemAgendaController