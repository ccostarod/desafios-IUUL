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
            console.log("Deu bom")
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
            console.log(paciente.dataValues.id);
            resultado =  await Agendamento.create(
                paciente,
                dataHoraInicial,
                dataHoraFinal
            );

            if (resultado.success) {
                await Session.Consultorio.addAgendamento(agendamento, paciente);

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