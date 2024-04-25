import { OperationStatus, OperationErrors } from "./OperationCode.js";
import Session from "../session/Session.js";

class ExclusaoPacienteController {
    async removePaciente(cpf) {
        const paciente = await Session.Consultorio.getPacienteByCPF(cpf);
        if (!paciente){
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        }
        else {
            if (Session.Consultorio.agenda.hasAgendamentoFuturo(paciente)){
                return {
                    status: OperationStatus.FAILURE,
                    errors: [OperationErrors.ALREADY_SCHEDULED]
                }
            }
            else {
                Session.Consultorio.removePaciente(paciente);
                return {
                    status: OperationStatus.SUCCESS,
                };
            }
        }
    }
}
export default ExclusaoPacienteController;