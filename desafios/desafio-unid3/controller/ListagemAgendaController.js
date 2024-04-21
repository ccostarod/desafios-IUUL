import Session from "../session/Session.js";

class ListagemAgendaController {
    agenda = () => this.#getAgenda(Session.Consultorio.agenda.iterator());

    agendaPeriod = (inicio, fim) =>
        this.#getAgenda(Session.Consultorio.agenda.iteratorPeriod(inicio, fim));

    #getAgenda(iterator) {
        const agendamentos = [];

        // Armazena os agendamentos retornados pelo iterador em um array
        for (const a of iterator) {
            agendamentos.push(a);
        }

        // Ordena o array por data/hora usando o total de milissegundos
        // de cada data/hora para comparação
        agendamentos.sort(
            (a, b) => a.dataHoraInicio.toMillis() - b.dataHoraInicio.toMillis()
        );

        return agendamentos;
    }
}

export default ListagemAgendaController