import { Menu, MenuOptions } from "../view/Menu.js";

class MenuPresenter {
    #controller;
    #view;

    constructor(controller){
        this.#controller = controller;
        this.#view = new Menu();
    }

    run() {
        for (;;) {
            let option = this.#view.Option;

            switch (option) {
                case MenuOptions.FIM:
                    return;
                    
                case MenuOptions.INCLUIR_PACIENTE:
                    this.#controller.incluirPaciente();
                    break;

                case MenuOptions.EXCLUIR_PACIENTE:
                    this.#controller.excluirPaciente();
                    break;

                case MenuOptions.LISTAR_PACIENTES_CPF:
                    this.#controller.listarPacientesCPF();
                    break;

                case MenuOptions.LISTAR_PACIENTES_NOME:
                    this.#controller.listarPacientesNome();
                    break;

                case MenuOptions.AGENDAR_CONSULTA:
                    this.#controller.agendarConsulta();
                    break;

                case MenuOptions.CANCELAR_AGENDAMENTO:
                    this.#controller.cancelarConsulta();
                    break;
    
                case MenuOptions.LISTAR_AGENDA:
                    this.#controller.listarAgenda();
                    break;
            }
        }
    }
}
export default MenuPresenter;