class Paciente {
    #cpf;
    #nome;
    #dataNascimento;

    constructor(cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(cpf) {
        this.#cpf = cpf;
    }

    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }
    set dataNascimento(dataNascimento) {
        this.#dataNascimento = dataNascimento;
    }
}
module.exports = Paciente;