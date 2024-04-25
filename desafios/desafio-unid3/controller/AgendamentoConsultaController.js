import { OperationErrors, OperationStatus } from "./OperationCode.js";
import Agendamento from "../model/Agendamento.js"
import Session from "../session/Session.js"

class AgendamentoConsultaController {
    
    async canAddConsulta(cpf) {
        const paciente = await Session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente) {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        }
        else if (await Session.Consultorio.agenda.hasAgendamentoFuturo(paciente)){
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

    async addConsulta(agendamento){
        const { cpf, dataHoraInicial, dataHoraFinal } = agendamento;

        let resultado =  await this.canAddConsulta(cpf);

        if (resultado.status !== OperationStatus.SUCCESS) {
            return { status: resultado.status, errors: resultado.errors}
        }
        else {
            const paciente = await Session.Consultorio.getPacienteByCPF(cpf);
            resultado =  await Agendamento.create(
                paciente,
                dataHoraInicial,
                dataHoraFinal
            );

            if (resultado.success) {
                let pacienteId = paciente.dataValues.id
                await Session.Consultorio.addAgendamento(agendamento, pacienteId);
                return { status: OperationStatus.SUCCESS };
            }
            else {
                return {
                    status: OperationStatus.FAILURE,
                    errors: resultado.failure,
                };
            }
        }
    }
}

export default AgendamentoConsultaController;