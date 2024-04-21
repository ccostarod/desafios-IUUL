import ListagemPacientesView from "../view/ListagemPacientesView.js";

class ListagemPacientesPresenter {
    #controller;
    #view;

    constructor(controller) {
        this.#controller = controller;
        this.#view = new ListagemPacientesView();
    }

    listByCPF() {
        this.#view.listPacientes(this.#controller.pacientesByCPF);
    }

    listByNome() {
        this.#view.listPacientes(this.#controller.pacientesByNome);
    }
}
export default ListagemPacientesPresenter;