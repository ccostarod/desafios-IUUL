import { OperationErrors, OperationStatus } from "./OperationCode.js";
import Paciente from "../model/Paciente.js"
import { validaCPF } from "../util/cpf.js"
import Session from "../session/Session.js"


class InclusaoPacienteController {

    async canAddPaciente(cpf) {
        if (validaCPF(cpf) && !(await Session.Consultorio.hasPaciente(cpf))){
            return { status: OperationStatus.SUCCESS };
        }
        else {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_ALREADY_REGISTERED],
            };
        }
    }

    async addPaciente(paciente) {
        let resultado = await this.canAddPaciente(paciente.cpf);

        if (resultado.status !== OperationStatus.SUCCESS) {
            return {
                status: resultado.status,
                errors: resultado.errors,
            };
        }
        else {
            resultado = Paciente.create(
                paciente.cpf,
                paciente.nome,
                paciente.dataNascimento
            );
            
            if (resultado.success) {
                const paciente = resultado.success;
                await Session.Consultorio.addPaciente({cpf: paciente.cpf, name: paciente.nome, dataNascimento: paciente.dataNascimento.toISODate()});
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