import { Paciente } from "../index.js"

class PacienteService {
  static async store(pacienteData) {
    const paciente = await Paciente.create(pacienteData);
    return paciente;
  }
}

export default PacienteService;