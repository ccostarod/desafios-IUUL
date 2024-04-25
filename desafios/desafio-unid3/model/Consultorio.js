import Agenda from './Agenda.js';
import ListaDePacientes from './ListaDePacientes.js';


class Consultorio {
    #pacientes;
    #agenda;

    constructor() {
        this.#pacientes = new ListaDePacientes();
        this.#agenda = new Agenda();
    }

    get pacientes() {
        return this.#pacientes;
    }

    get agenda(){
        return this.#agenda;
    }

    async addPaciente(paciente) {
        if (!(await this.hasPaciente(paciente.cpf))){
            await this.#pacientes.add(paciente);
            return true;
        }
        else {
            return false;
        }
    }
    
    removePaciente(paciente) {
        this.#pacientes.remove(paciente);
    }

    hasPaciente = async(cpf) => {
        const paciente = await this.getPacienteByCPF(cpf);
        return paciente != null;  
    };

    getPacienteByCPF =  async(cpf) => await this.#pacientes.getByCPF(cpf);

    async addAgendamento(agendamento, paciente) {
        await this.#agenda.add(agendamento, paciente);
    }

    async removeAgendamentoPorHorario(dataHora) {
        return await this.#agenda.remove(dataHora);
    }
}
export default Consultorio;