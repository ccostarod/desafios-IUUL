import { OperationStatus } from '../controller/OperationCode.js';
import AgendamentoConsultaView from '../view/AgendamentoConsultaView.js';

class AgendamentoConsultaPresenter {
    #view;
    #controller;

    constructor(controller) {
        this.#controller = controller;
        this.#view = new AgendamentoConsultaView();
    }

    run() {
        const cpf =  this.#view.readCPF();

        const result = this.#controller.canAddConsulta(cpf);

        if (result.status !== OperationStatus.SUCCESS){
            this.#view.process(result.status, result.errors);
        }
        else {
            //Pede os outros dados:
            const data = this.#view.readData();

            const result = this.#controller.addConsulta({cpf, ...data});
            
            if (result.status === OperationStatus.SUCCESS) {
                this.#view.process(OperationStatus.SUCCESS);
            }
            else {
                this.#view.process(OperationStatus.FAILURE, result.errors);
            }
        }
    }
}

export default AgendamentoConsultaPresenter;