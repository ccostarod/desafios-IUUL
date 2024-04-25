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
import { DateTime } from "luxon";
import { Op } from "sequelize";
import Agendamento from "../database/models/Agendamento.js";

class Agenda {
    async add(agendamento, paciente) {
        return await AgendamentoService.store(agendamento, paciente);
    }

    async remove(agendamento) {
        return await AgendamentoService.delete(agendamento.paciente);
    }

    async *iterator() {
        const agendamentos = await AgendamentoService.getAll();
        for (let a of agendamentos) yield a;
    }

    async *iteratorPeriod(inicio, fim) {
        const agendamentos = await AgendamentoService.getAll();
        const agendamentosPeriod = agendamentos.filter(
            (a) => a.dataHoraInicio >= inicio && a.dataHoraFim <= fim
        );

        for (let a of agendamentosPeriod) yield a;
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
                    dataHoraInicio: {
                        [Op.gt]: new Date()
                    }
                }
            });
            return agendamento;
        }

    async hasIntersecao(outroAgendamento) {
        const agendamentos = await AgendamentoService.getAll();
        return agendamentos.some((a) => a.hasIntersecaoHorario(outroAgendamento.dataHoraInicial, outroAgendamento.dataHoraFim));
    }

    hasIntersecaoHorario(dataHoraInicial, dataHoraFim) {
        // Verifica se o horário inicial do novo agendamento está dentro do intervalo do agendamento existente
        const inicioIntersecta = this.dataHoraInicio <= dataHoraInicial && this.dataHoraFim > dataHoraInicial;

        // Verifica se o horário final do novo agendamento está dentro do intervalo do agendamento existente
        const fimIntersecta = this.dataHoraInicio < dataHoraFim && this.dataHoraFim >= dataHoraFim;

        // Verifica se o novo agendamento engloba completamente o agendamento existente
        const engloba = this.dataHoraInicio >= dataHoraInicial && this.dataHoraFim <= dataHoraFim;

        return inicioIntersecta || fimIntersecta || engloba;
    }
}

export default Agenda;