import { OperationErrors, OperationStatus } from "./OperationCode.js";
import Paciente from "../model/Paciente.js"
import { validaCPF } from "../util/cpf.js"
import Session from "../session/Session.js"


class InclusaoPacienteController {
//    canAddPaciente = (cpf) =>
        // Verifica se CPF é valido e se não há outro paciente om o mesmo CPF
//        validaCPF(cpf) && Session.Consultorio.hasPaciente(cpf)
//            ? { status: OperationStatus.SUCCESS }
//            : {
//                  status: OperationStatus.FAILURE,
//                  errors: [OperationErrors.PATIENT_ALREADY_REGISTERED],
//              };

    canAddPaciente(cpf) {
        if (validaCPF(cpf) && !Session.Consultorio.hasPaciente(cpf)){
            return { status: OperationStatus.SUCCESS };
        }
        else {
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_ALREADY_REGISTERED],
            };
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
            resultado = Paciente.create(
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