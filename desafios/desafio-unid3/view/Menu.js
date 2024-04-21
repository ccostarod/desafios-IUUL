import Input from "../helpers/Input.js";
import Output from "../helpers/output.js";

// Primeiro digito indica o menu
// Segundo digito indica a funcionalidade

class MenuOptions {
    static get INCLUIR_PACIENTE() {
        return 11;
    }
    static get EXCLUIR_PACIENTE() {
        return 12;
    }
    static get LISTAR_PACIENTES_CPF() {
        return 13;
    }
    static get LISTAR_PACIENTES_NOME() {
        return 14;
    }
    static get AGENDAR_CONSULTA() {
        return 21;
    }
    static get CANCELAR_AGENDAMENTO() {
        return 22;
    }
    static get LISTAR_AGENDA() {
        return 23;
    }
    static get FIM() {
        return 3;
    }
}

class Menu {
    #menuId;
    #output;
    #input;

    constructor() {
        this.#menuId = 0;
        this.#output = new Output();
        this.#input = new Input();
    }

    get Option() {
        let lastOption;

        for (;;) {
            switch (this.#menuId) {
                case 0:
                    this.#showMainMenu();
                    lastOption = 3;
                    break;
                
                case 1:
                    this.#showPatientMenu();
                    lastOption = 5;
                    break;

                case 2:
                    this.#showScheduleMenu();
                    lastOption = 4;
                    break;
            }

            let choice = this.#input.readInteger(
                'Opcao: ',
                'Opcao invalida.',
                { min: 1, max: lastOption},
            );

            if (choice == lastOption) {
                if (this.#menuId === 0) {
                    return MenuOptions.FIM;
                }
                else {
                    this.#menuId = 0;
                }
            }
            else {
                if (this.#menuId === 0) {
                    this.#menuId = choice;
                }
                else {
                    return this.#menuId * 10 + choice;
                }
            }
        }
    }
    #showMainMenu() {
        this.#output.writeLine(`
---------------------------
       Menu Principal
---------------------------
  1 - Cadastro de pacientes
  2 - Agenda
  3 - Fim
`);
    }

    #showPatientMenu() {
        this.#output.writeLine(`
------------------------------------------
       Menu do Cadastro de Pacientes
------------------------------------------
  1 - Cadastrar novo paciente
  2 - Excluir paciente
  3 - Listar pacientes(ordenado por CPF)
  4 - Listar pacientes(ordenado por nome)
  5 - Voltar p / menu principal
`);    
    }

    #showScheduleMenu() {
        this.#output.writeLine(`
-----------------------------
            Agenda
-----------------------------
  1-Agendar consulta
  2-Cancelar agendamento
  3-Listar agenda
  4-Voltar p/ menu principal
`);
    }
}

export { Menu, MenuOptions };