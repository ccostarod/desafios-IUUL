import { OperationErrors, OperationStatus } from "../controller/OperationCode";
import { validaCPF } from "../model/Paciente";
import Input from "../helpers/Input";
import Output from "../helpers/output";

class InclusaoPacienteView {
    #input;
    #output;
    #messages;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
        this.#messages = new Map();

        this.#setupMessages();
    }

    readCPF() {
        this.#input.readInteger(
            'CPF: ',
            'CPF invalido', {
                min: 111111111,
                max: 99999999999,
                isValid: validaCPF,
            }
        );
    }

    readData() {
        const nome = this.#input.readString(
            'Nome: ',
            'Nome deve ter ao menos 5 caracateres',
            { capitalize: true }
        );

        const dataNascimento = this.#input.readDate(
            'Data de nascimento (DDMMAAAA): ',
            'Data de nascimento invalida',
        );

        return { nome, dataNascimento };
    }

    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine('\nPaciente cadastrado com sucesso!');
        }
        else {
            this.#output.writeLine('\nErro ao cadastrar paciente: ');
            errors.forEach((error) => {
                this.#output.writeLine(this.#messages.get(error));
            });
        }
    }

    #setupMessages() {
        this.#messages.set(
            OperationErrors.INVALID_PATIENT_DOCUMENT,
            '- CPF inválido.'
        );
        this.#messages.set(
            OperationErrors.INVALID_PATIENT_NAME,
            '- Nome inválido. Deve ter ao menos 5 caracteres.'
        );
        this.#messages.set(
            OperationErrors.INVALID_PATIENT_BIRTHDATE,
            '- Data de nascimento inválida. Paciente deve ter ao menos 13 anos.'
        );
        this.#messages.set(
            OperationErrors.PATIENT_ALREADY_REGISTERED,
            '- Já existe um paciente cadastrado com esse CPF.'
        );
    }
}
export default InclusaoPacienteView;