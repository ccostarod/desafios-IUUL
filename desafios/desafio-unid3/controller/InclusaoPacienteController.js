import { OperationErrors, OperationStatus } from "./OperationCode";
import { Paciente } from "../model/Paciente"
import { validaCPF, formataCPF } from "../model/Paciente";
import { Session } from "../session/Session"


class InclusaoPacienteController {
    canAddPaciente(cpf) {
        if (validaCPF(cpf) && !Session.Consultorio.hasPaciente(cpf)){
            return {
                status: OperationStatus.SUCCESS,
            };
        }
        else{
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_ALREADY_REGISTERED]
            }
        }
    }

    addPaciente(paciente) {
        let resultado = this.canAddPaciente(paciente.cpf);

        if (resultado.status !== OperationStatus.SUCCESS) {
            return {
                status: resultado.status,
                errors: resultado.errors,
            };
        }
        else {
            resultado = paciente.create(
                paciente.cpf,
                paciente.nome,
                paciente.dataNascimento
            );

            if (resultado.success) {
                const paciente = resultado.success;
                Session.Consultorio.addPaciente(paciente);
                return {
                    status: OperationStatus.SUCCESS,
                };
            }
            else {
                return {
                    status: OperationStatus.FAILURE,
                    errors: resultado.failure,
                }
            }
        }
    }
}
export default InclusaoPacienteController;