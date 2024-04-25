import Session from "../session/Session.js";

class ListagemPacientesController {
    async pacientesByCPF() {
        return await Session.Consultorio.pacientes.getAllOrderCPF();
    }

    async pacientesByNome() {
        return await Session.Consultorio.pacientes.getAllOrderName();
    }
}

export default ListagemPacientesController;