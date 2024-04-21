import { OperationStatus } from "../controller/OperationCode.js";
import CancelamentoConsultaView from "../view/CancelamentoConsultaView.js";

class CancelamentoConsultaPresenter {
    #controller;
    #view;

    constructor(controller){
        this.#controller = controller;
        this.#view = new CancelamentoConsultaView();
    }

    run() {
        const cpf = this.#view.readCPF();

        const result = this.#controller.canCancelarConsulta(cpf);

        if (result !== OperationStatus.SUCCESS) {
            this.#view.process(result.status, result.errors);
        }
        else {
            const data = this.#view.readData();

            const result = this.#controller.cancelarConsulta({cpf, ...data});

            if (result.status === OperationStatus.SUCCESS) {
                this.#view.process(OperationStatus.SUCCESS);
            }
            else {
                this.#view.process(OperationStatus.FAILURE, result.errors);
            }
        }
    }
}

export default CancelamentoConsultaPresenter;