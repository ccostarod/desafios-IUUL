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
        for (let i = 0; i < this.#alunos.length; i++) {
            if (this.#alunos[i].matricula === matricula) {
                this.#alunos.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    lancarNota(matricula, notaProva, tipo){
        const aluno = this.#alunos.find((x) => x.matricula === matricula);
        if (!aluno) return false;
        print(`Nota do aluno ${aluno.nome} foi lançada!`)
        if (tipo === 1) aluno.p1 = notaProva;
        else if(tipo === 2) aluno.p2 = notaProva;
        return true;
    }

    imprimir() {
        this.#alunos.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log('---------------------------------------');
        console.log('Matricula Nome P1 P2 NF');
        console.log('---------------------------------------');
        this.#alunos.forEach(aluno => {
            let p1 = '-';
            let p2 = '-';
            if (aluno.p1 !== null) {
                p1 = aluno.p1.toFixed(1);
            }
            if (aluno.p2 !== null) {
                p2 = aluno.p2.toFixed(1);
            }
            console.log(`${aluno.matricula} ${aluno.nome} ${p1} ${p2} ${aluno.notaFinal.toFixed(1)}`);
        });
        console.log('---------------------------------------');
    }
}
module.exports = Turma;