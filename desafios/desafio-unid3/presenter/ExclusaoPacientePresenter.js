import { OperationStatus } from "../controller/OperationCode.js"
import ExclusaoPacienteView from "../view/ExclusaoPacienteView.js"

class ExclusaoPacientePresenter {
    #controller;
    #view;

    constructor(controller) {
        this.#controller = controller;
        this.#view = new ExclusaoPacienteView();
    }

    async run() {
        const cpf = this.#view.readCPF();

        const result = this.#controller.removePaciente(cpf);

        if (result.status === OperationStatus.SUCCESS) {
            this.#view.process(OperationStatus.SUCCESS);
        }
        else {
            this.#view.process(OperationStatus.FAILURE, result.errors)
        }
    }
}

export default ExclusaoPacientePresenter;