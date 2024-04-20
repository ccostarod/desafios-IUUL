import Agenda from './Agenda';
import { ListaDePacietes } from './ListaDePacientes';


class Consultorio {
    #pacientes;
    #agenda;

    constructor(paciente, dataConsulta, horaInicial, horaFinal) {
        this.#pacientes = new ListaDePacietes();
        this.#agenda = new Agenda();
    }

    get pacientes() {
        return this.#pacientes;
    }

    get agenda(){
        return this.#agenda;
    }

    addPaciente(paciente) {
        if (!this.hasPaciente(paciente.cpf)){
            this.#pacientes.add(paciente);
            return true;
        }
        else {
            return false;
        }
    }
    
    removePaciente(paciente) {
        this.#pacientes.remove(paciente);
    }

    hasPaciente(cpf){
        this.getPacienteByCPF(cpf) !== undefined;
    }

    getPacienteByCPF(cpf) {
        this.#pacientes.getByCPF(cpf);
    }

    addAgendamento(agendamento) {
        this.#agenda.add(agendamento);
    }

    removeAgendamentoPorHorario(dataHora) {
        const agendamento = this.#agenda.removeHorario(dataHora);
        
        if (agendamento && agendamento.paciente) {
            agendamento.paciente.removeAgendamento(agendamento);
        }
    }
}
export default Consultorio;