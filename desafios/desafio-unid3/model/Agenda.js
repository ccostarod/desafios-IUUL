// import { DateTime } from "luxon";
// import AgendamentoService from "../database/services/AgendamentoService";

// class Agenda {
//     #agendamentos;

//     constructor() {
//         this.#agendamentos  = [];
//     }

//     add(agendamento) {
//         this.#agendamentos.push(agendamento);
//     }

//     removeHorario(dataHora) {
//         const index = this.#agendamentos.findIndex((a) => a.startAt(dataHora)
//         );

//         if (index != -1) {
//             const agendamento = this.#agendamentos[index];
//             this.#agendamentos.splice(index, 1);

//             return agendamento;
//         }

//         return null;
//     }

//     *iterator() {
//         for (let a of this.#agendamentos) yield a;
//     }

//     *iteratorPeriod(inicio, fim) {
//         const agendamentosPeriod = this.#agendamentos.filter(
//             (a) => a.dataHoraInicio >= inicio && a.dataHoraFim <= fim
//         );

//         for (let a of agendamentosPeriod) yield a;
//     }

//     hasAgendamentoFuturo(paciente) {
//         return this.#agendamentos.some((a) => a.paciente.equals(paciente) && a.dataHoraInicio > DateTime.now());
//     }

//     agendamentoFuturo(paciente) {
//         return this.#agendamentos.find((a) => a.paciente.equals(paciente) && a.dataHoraInicio > DateTime.now());
//     }

//     hasIntersecao(inicial, final) {
//         this.#agendamentos.some((a) => a.hasIntersecaoHorario(inicial, final));
//     }
// }

// export default Agenda
import AgendamentoService from "../database/services/AgendamentoService.js";
import { Op } from "sequelize";
import Agendamento from "../database/models/Agendamento.js";

class Agenda {
    async add(agendamento, paciente) {
        return await AgendamentoService.store(agendamento, paciente);
    }

    async remove(agendamento) {
        return await AgendamentoService.delete(agendamento);
    }

    async agenda() {
        const agendamentos = await AgendamentoService.getAll();
        return agendamentos;
    }

    async agendaPeriod(inicio, fim) {
        const agendamentos = await AgendamentoService.getAll();
        const dataFim = fim.toISODate();
        const dataInicio = inicio.toISODate();
        const agendamentosPeriod = agendamentos.filter(
            (a) => a.data >= dataInicio && a.data <= dataFim
        );
        return agendamentosPeriod;
    }

    async hasAgendamentoFuturo(paciente) {
        const agendamentos = await Agendamento.findAll({
            where: {
                pacienteId: paciente.id,
                data: {
                    [Op.gt]: new Date()
                }
            }
        });
        return agendamentos.length > 0;
    }

    async agendamentoFuturo(paciente) {
        const agendamento = await Agendamento.findOne({
            where: {
                pacienteId: paciente.id,
                data: {
                    [Op.gt]: new Date()
                }
            }
        });
        return agendamento;
    }

    async checkInterference(dataHoraInicial, dataHoraFinal) {
        try {
            const data = dataHoraInicial.toISODate();
            const horaInicio = dataHoraInicial.toISOTime();
            const horaFim = dataHoraFinal.toISOTime();

            const allAgendamentos = await AgendamentoService.getAll();

            for (let agendamento of allAgendamentos) {
                if (agendamento.data === data) {
                    if ((horaInicio >= agendamento.horaInicio && horaInicio <= agendamento.horaFim) ||
                        (horaFim >= agendamento.horaInicio && horaFim <= agendamento.horaFim)) {
                        return true;
                    }
                }
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }


}

export default Agenda;