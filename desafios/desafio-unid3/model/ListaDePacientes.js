import PacienteService from "../database/services/PacienteService.js";

class ListaDePacientes {
    getAllOrderName = async () => {
        const pacientesOrdenadosPorNome = await PacienteService.getAllOrderName();
        return pacientesOrdenadosPorNome;
    };

    getAllOrderCPF = async () => {
        const pacientesOrdenadosPorCPF = await PacienteService.getAllOrderCPF();
        return pacientesOrdenadosPorCPF;
    };

    add = async (paciente) => {
        const addedPaciente = await PacienteService.store(paciente);
        return addedPaciente;
    };

    remove = async (paciente) => {
        const success = await PacienteService.delete(paciente.cpf);
        return success;
    };

    getByCPF = async (cpf) => {
        const paciente = await PacienteService.getByCPF(cpf);
        return paciente;
    };
}

export default ListaDePacientes;