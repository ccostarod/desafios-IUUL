import AgendamentoConsultaPresenter from "../presenter/AgendamentoConsultaPresenter.js";
import CancelamentoConsultaPresenter from "../presenter/CancelamentoConsultaPresenter.js";
import ExclusaoPacientePresenter from "../presenter/ExclusaoPacientePresenter.js";
import InclusaoPacientePresenter from "../presenter/InclusaoPacientePresenter.js";
import ListagemAgendaPresenter from "../presenter/ListagemAgendaPresenter.js";
import ListagemPacientesPresenter from "../presenter/ListagemPacientesPresenter.js";
import AgendamentoConsultaController from "./AgendamentoConsultaController.js";
import CancelamentoConsultaController from "./CancelamentoConsultaController.js";
import ExclusaoPacienteController from "./ExclusaoPacienteController.js";
import InclusaoPacienteController from "./InclusaoPacienteController.js";
import ListagemAgendaController from "./ListagemAgendaController.js";
import ListagemPacientesController from "./ListagemPacientesController.js";

class MainController {
    async incluirPaciente() {
        const controller = new InclusaoPacienteController();

        // Injeção de dependencia:
        const presenter = new InclusaoPacientePresenter(controller);

        await presenter.run();
    }


    excluirPaciente() {
        const controller = new ExclusaoPacienteController();

        const presenter = new ExclusaoPacientePresenter(controller);

        presenter.run();
    }

    async listarPacientesCPF() {
        const controller = new ListagemPacientesController();

        const presenter = new ListagemPacientesPresenter(controller);

        await presenter.listByCPF();
    }

    async listarPacientesNome() {
        const controller = new ListagemPacientesController();

        const presenter = new ListagemPacientesPresenter(controller);

        await presenter.listByNome();
    }

    async agendarConsulta() {
        const controller = new AgendamentoConsultaController();

        const presenter = new AgendamentoConsultaPresenter(controller);

        await presenter.run();
    }

    cancelarConsulta() {
        const controller = new CancelamentoConsultaController();

        const presenter = new CancelamentoConsultaPresenter(controller);

        presenter.run();
    }

    listarAgenda() {
        const controller = new ListagemAgendaController();

        const presenter = new ListagemAgendaPresenter(controller);

        presenter.run();
    }
}

export default MainController;