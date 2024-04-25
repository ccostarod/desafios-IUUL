import { ListagemAgendaView, Period } from '../view/ListagemAgendaView.js';

class ListagemAgendaPresenter {
    #controller;
    #view;

    constructor(controller) {
        this.#controller = controller;
        this.#view = new ListagemAgendaView();
    }

    async run() {
        const option = this.#view.readOption();

        if (option === Period.ALL) {
            await this.#view.listAgenda(await this.#controller.agenda())
        }
        else {
            const { dataInicio, dataFim } = this.#view.readPeriod();

            await this.#view.listAgenda(await this.#controller.agendaPeriod(dataInicio, dataFim));
        }
    }
}

export default ListagemAgendaPresenter;