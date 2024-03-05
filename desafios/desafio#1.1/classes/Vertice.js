class Vertice{
    #x;
    #y;

    constructor(x,y){
        this.#x = x;
        this.#y = y;
    }

    //metodos getters
    get X(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }

    distancia(vertice){
        return Math.sqrt(Math.pow(this.#x - vertice.x, 2) + Math.pow(this.#y - vertice.y, 2) )
    }

    move(x,y){
        this.#x = x;
        this.#y = y;
    }

    equals(vertice){
        return this.#x === vertice.x && this.#y === vertice.y;
    }
}
module.exports = Vertice;