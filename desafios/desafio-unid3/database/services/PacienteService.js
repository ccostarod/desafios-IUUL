import Paciente from "../models/Paciente.js";

class PacienteService {
    static async getAll() {
        try {
            return await Paciente.findAll();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getPacienteById(id) {
        try {
            const paciente = await Paciente.findOne({ where: {id} });
            return paciente;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getAllOrderName() {
        try {
            const pacientesOrdenadosPorNome = await Paciente.findAll({
                order: [
                    ['name', 'ASC'],
                ]
            });
            return pacientesOrdenadosPorNome;
        } catch (error) {
            console.error(error);
            return { error: 'An error occurred while fetching patients.' };
        }
    }

    static async getAllOrderCPF() {
        try {
            const pacientesOrdenadosPorCPF = await Paciente.findAll({
                order: [
                    ['cpf', 'ASC'],
                ]
            });
            return pacientesOrdenadosPorCPF;
        } catch (error) {
            console.error(error);
            return { error: 'An error occurred while fetching patients.' };
        }
    }

    static async getByCPF(cpf) {
        try {
            return await Paciente.findOne({ where: { cpf } });
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async store(pacienteData) {
        try {
            return await Paciente.create(pacienteData);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async delete(cpf) {
        try {
            const paciente = await this.getByCPF(cpf);
            if (paciente) {
                await paciente.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default PacienteService;