class Aluno{
    #matricula;
    #nome;
    #p1;
    #p2;

    constructor(matricula, nome){
        this.#matricula = matricula;
        this.#nome = nome;
        this.#p1 = null;
        this.#p2 = null;
    }

    get matricula(){
        return this.#matricula;
    }
    get nome(){
        return this.#nome;
    }
    get p1(){
        return this.#p1;
    }
    set p1(nota){
        this.#p1 = nota;
    }
    get p2(){
        return this.#p2;
    }
    set p2(nota){
        this.#p2 = nota;
    }

    get notaFinal(){
        if (this.#p1 === null && this.#p2 !== null){
            return this.#p2 / 2;
        }
        else if (this.#p2 === null && this.#p1 !== null){
            return this.#p1 / 2;
        }
        else if (this.#p1 !== null && this.#p2 !== null){
            return (this.p1 + this.p2) / 2
        }
        else {
            return 0;
        }
    }
}
module.exports = Aluno;