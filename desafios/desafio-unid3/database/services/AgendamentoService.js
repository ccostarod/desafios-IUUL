import Agendamento from "../models/Agendamento.js";

class AgendamentoService {
    static async getAll() {
        try {
            return await Agendamento.findAll();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getByPaciente(paciente) {
        try {
            return await Agendamento.findOne({ where: { paciente } });
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async getByPacienteId() {
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

    static async store(agendamentoData, paciente) {
        try {
            const { dataHoraInicial, dataHoraFinal } = agendamentoData;
            
            const pacienteID = paciente.id;
            const data = dataHoraInicial.toISODate();
            const horaInicio = dataHoraInicial.toISOTime();
            const horaFim = dataHoraFinal.toISOTime();

            return await Agendamento.create({
                data,
                horaInicio,
                horaFim,
                pacienteID,
            });
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async delete(paciente) {
        try {
            const agendamento = await this.getByPaciente(paciente);
            if (agendamento) {
                await agendamento.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default AgendamentoService;