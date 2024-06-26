import { OperationErrors, OperationStatus } from "../controller/OperationCode.js";
import { validaCPF } from "../util/cpf.js";
import Input from "../helpers/Input.js";
import Output from "../helpers/output.js";

class ExclusaoPacienteView {
    #input;
    #output;
    #messages;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
        this.#messages = new Map();

        this.#setupMessages();
    }

    readCPF = () =>
        this.#input.readInteger('CPF: ', 'CPF inválido', {
            min: 111111111,
            max: 99999999999,
            isValid: validaCPF,
        });
    
    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine('\nPaciente excluido com sucesso!');
        }
        else {
            this.#output.writeLine('\nErro ao excluir paciente: ');
            errors.forEach((error) => {
                this.#output.writeLine(this.#messages.get(error));
            })
        }
    }

    #setupMessages() {
        this.#messages.set(
            OperationErrors.PATIENT_NOT_REGISTERED,
            '- Paciente não encontrado.'
        );
        this.#messages.set(
            OperationErrors.ALREADY_SCHEDULED,
            '- Paciente possui uma consulta agendada.'
        );
    }
}

export default ExclusaoPacienteView;