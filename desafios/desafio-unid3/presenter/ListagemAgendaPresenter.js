import { ListagemAgendaView, Period } from '../view/ListagemAgendaView.js';

class ListagemAgendaPresenter {
    #controller;
    #view;

    constructor(controller) {
        this.#controller = controller;
        this.#view = new ListagemAgendaView();
    }

    run() {
        const option = this.#view.readOption();

        if (option === Period.ALL) {
            this.#view.listAgenda(this.#controller.agenda())
        }
        else {
            const { dataInicio, dataFim } = this.#view.readPeriod();

            this.#view.listAgenda(this.#controller.agendaPeriod(dataInicio, dataFim));
        }
    }
}

export default ListagemAgendaPresenter;