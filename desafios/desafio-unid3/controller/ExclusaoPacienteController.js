import { OperationStatus, OperationErrors } from "./OperationCode";
import Session from "../session/Session";

class ExclusaoPacienteController {
    removePaciente(cpf) {
        const paciente = Session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente){
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        }
        else {
            if (paciente.hasAgendamentoFuturo()){
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