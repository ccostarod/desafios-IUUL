import Session from "../session/Session.js";

class ListagemAgendaController {
    async agenda() {
        const agendamentos = await Session.Consultorio.agenda.agenda();
        return this.#sortAgendamentos(agendamentos);
    }

    async agendaPeriod(inicio, fim) {
        const agendamentos = await Session.Consultorio.agenda.agendaPeriod(inicio, fim);
        return this.#sortAgendamentos(agendamentos);
    }

    #sortAgendamentos(agendamentos) {
        agendamentos.sort(
            (a, b) => new Date(a.data) - new Date(b.data)
        );

        return agendamentos;
    }
}

export default ListagemAgendaController