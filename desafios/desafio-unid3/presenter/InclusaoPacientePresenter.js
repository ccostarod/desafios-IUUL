import { OperationStatus } from "../controller/OperationCode.js";
import InclusaoPacienteView from "../view/InclusaoPacienteView.js";

class InclusaoPacientePresenter {
    #controller;
    #view;

    constructor(controller){
        this.#controller = controller;
        this.#view = new InclusaoPacienteView();
    }

    async run() {
        const cpf = this.#view.readCPF();
        
        let result = await this.#controller.canAddPaciente(cpf);

        if (result.status !== OperationStatus.SUCCESS){
            this.#view.process(result.status, result.errors);
        }
        else {
            const data = this.#view.readData();

            result = await this.#controller.addPaciente( {cpf, ...data} );

            if (result.status === OperationStatus.SUCCESS) {
                this.#view.process(OperationStatus.SUCCESS); 
            }
            else {
                this.#view.process(OperationStatus.FAILURE, result.errors);
            }
        }
    }
}

export default InclusaoPacientePresenter;