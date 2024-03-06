var Vertice = require('./Vertice')
class Poligono {
    #vertices;
    constructor(...listaVertices) {
        if (listaVertices.length < 3){
            throw new error("Você deve inserir ao menos 3 vértices")
        }
        this.#vertices = listaVertices;
    }

    
    addVertice(v) {
        if (this.#vertices.some(vertice => vertice.equals(v))) { //procurar na lista se existe algum vertice igual a v
            return false;
        }
        this.#vertices.push(v); // adiciona a lista caso não tenha nada
        return true;
    }
    
    get perimetro() {
        let perimetro = 0;
        for (let i = 0; i < this.#vertices.length; i++) {
            perimetro += this.#vertices[i].distancia(this.#vertices[(i + 1) % this.#vertices.length]);
        }
        return perimetro;
    }
    
    get qtdVertices() {
        return this.#vertices.length;
    }
}
module.exports = Poligono;