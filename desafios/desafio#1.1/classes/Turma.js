var Aluno = require('./Aluno');

class Turma{
    #alunos;
    constructor(){
        this.#alunos;
    }

    adicionarAluno(matriculaAluno, nomeAluno){
        if(this.#alunos.some(aluno => aluno.matricula == matriculaAluno)) return false;
        this.#alunos.push(new Aluno(matriculaAluno, nomeAluno));
        return true;
    }

    removerAluno(matricula){
        //todo
    }
}