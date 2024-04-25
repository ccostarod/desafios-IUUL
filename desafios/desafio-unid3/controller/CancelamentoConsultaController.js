import Session from "../session/Session.js";
import { OperationErrors, OperationStatus } from "./OperationCode.js";

class CancelamentoConsultaController {
    canCancelarConsulta(cpf){
        const paciente = Session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente) {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        }
        else if (!paciente.hasAgendamentoFuturo()) {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.SCHEDULE_NOT_REGISTERED],
            };
        }
        else {
            return {
                status: OperationStatus.SUCCESS,
            };
        }
    }

    cancelarConsulta(agendamento){
        const { cpf, dataHoraInicio } = agendamento;

        let resultado = this.canCancelarConsulta(cpf);

        if (resultado.status !== OperationStatus.SUCCESS){
            return {
                status: resultado.status,
                errors: resultado.errors,
            };
        }
        else {
            const paciente = Session.Consultorio.getPacienteByCPF(cpf); // recupera o paciente pelo cpf

            // const agendamento = paciente.agendamentoFuturo(); // Recupera o agendamneto do paciente
            const agendamento = Session.Consultorio.agenda.agendamentoFuturo(paciente);

            if (!agendamento.dataHoraInicio.equals(dataHoraInicio)) {
                return {
                    status: OperationStatus.FAILURE,
                    errors: [OperationErrors.SCHEDULE_NOT_REGISTERED],
                };
            }
            else {
                Session.Consultorio.removeAgendamentoPorHorario(dataHoraInicio);
                return {
                    status: OperationStatus.SUCCESS,
                };
            }
        }
    }
}
export default CancelamentoConsultaController;