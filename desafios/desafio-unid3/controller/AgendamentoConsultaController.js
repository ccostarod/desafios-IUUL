import { OperationErrors, OperationStatus } from "./OperationCode.js";
import Agendamento from "../model/Agendamento.js"
import Session from "../session/Session.js"

class AgendamentoConsultaController {
    
    canAddConsulta(cpf) {
        const paciente = Session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente) {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        }
        else if (paciente.hasAgendamentoFuturo()){
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.ALREADY_SCHEDULED]
            };
        }
        else {
            return {
                status: OperationStatus.SUCCESS
            };
        }
    }

    addConsulta(agendamento){
        const { cpf, dataHoraInicial, dataHoraFinal } = agendamento;

        let resultado =  this.canAddConsulta(cpf);

        if (resultado.status !== OperationStatus.SUCCESS) {
            return { status: resultado.status, errors: resultado.errors}
        }
        else {
            const paciente = Session.Consultorio.getPacienteByCPF(cpf);

            resultado =  Agendamento.create(
                paciente,
                dataHoraInicial,
                dataHoraFinal
            );

            if (resultado.success) {
                const agendamento = resultado.success; // .success retorna uma nova instancia de Agendamento

                Session.Consultorio.addAgendamento(agendamento);

                return { status: OperationStatus.SUCCESS };
            }
            else {
                return {
                    status: OperationStatus.FAILURE,
                    errors: result.failure,
                };
            }
        }
    }
}

export default AgendamentoConsultaController;