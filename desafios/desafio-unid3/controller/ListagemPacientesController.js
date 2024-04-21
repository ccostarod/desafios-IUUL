import Session from "../session/Session.js";

class ListagemPacientesController {
    get pacientesByCPF() {
        return this.#getPacientes((p1, p2) => p1.cpf - p2.cpf);
    }

    get pacientesByNome() {
    return this.#getPacientes((p1, p2) => {
        if (p1.nome < p2.nome) {
            return -1;
        } else if (p1.nome > p2.nome) {
            return 1;
        } else {
            return 0;
        }
    });
    }

    #getPacientes(comparator) {
        const iterator = Session.Consultorio.pacientes.iterator();
        const pacientes = [];

        for (const p of iterator) {
            pacientes.push(p);
        }

        pacientes.sort(comparator);

        return pacientes;
    }
}

export default ListagemPacientesController;