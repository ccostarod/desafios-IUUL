import { DateTime } from "luxon";
import Session from "../session/Session.js";
import { OperationErrors, OperationStatus } from "./OperationCode.js";

class CancelamentoConsultaController {
    async canCancelarConsulta(cpf){
        const paciente = await Session.Consultorio.getPacienteByCPF(cpf);
        if (!paciente) {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        }
        
        else if (!(await Session.Consultorio.agenda.hasAgendamentoFuturo(paciente))) {
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

    async cancelarConsulta(agendamento){
        const { cpf, dataHoraInicio } = agendamento;

        let resultado = await this.canCancelarConsulta(cpf);

        if (resultado.status !== OperationStatus.SUCCESS){
            return {
                status: resultado.status,
                errors: resultado.errors,
            };
        }
        else {
            const paciente = await Session.Consultorio.getPacienteByCPF(cpf);

            const agendamento = await Session.Consultorio.agenda.agendamentoFuturo(paciente);

            const data = agendamento.data;
            const horaInicio = agendamento.horaInicio;
            
            let dateTime = DateTime.fromISO(data);
            const [hora, minuto, segundo] = horaInicio.split(':').map(Number);
            dateTime = dateTime.set({ hour: hora, minute: minuto, second: segundo });

            if (!dateTime.equals(dataHoraInicio)) {
                return {
                    status: OperationStatus.FAILURE,
                    errors: [OperationErrors.SCHEDULE_NOT_REGISTERED],
                };
            }
            else {
                await Session.Consultorio.removeAgendamentoPorHorario(dataHoraInicio);
                return {
                    status: OperationStatus.SUCCESS,
                };
            }
        }
    }
}
export default CancelamentoConsultaController;