import ListagemPacientesView from "../view/ListagemPacientesView.js";

class ListagemPacientesPresenter {
    #controller;
    #view;

    constructor(controller) {
        this.#controller = controller;
        this.#view = new ListagemPacientesView();
    }

    async listByCPF() {
        this.#view.listPacientes(await this.#controller.pacientesByCPF());
    }

    async listByNome() {
        this.#view.listPacientes(await this.#controller.pacientesByNome());
    }
}
export default ListagemPacientesPresenter;