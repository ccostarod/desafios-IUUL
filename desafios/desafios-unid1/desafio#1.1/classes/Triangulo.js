var Vertice = require('./Vertice')
class Triangulo{
    #ver1;
    #ver2;
    #ver3;

    constructor(ver1, ver2, ver3){
        if (!this.#formaTriangulo(ver1, ver2, ver3)){
            throw new Error("Os vértices que foram fornecidos não formam um triângulo válido")
        }
        this.#ver1 = ver1;
        this.#ver2 = ver2;
        this.#ver3 = ver3
    }

    #formaTriangulo(ver1, ver2, ver3){
        const lado1 = ver1.distancia(ver2);
        const lado2 = ver2.distancia(ver3);
        const lado3 = ver3.distancia(ver1);

        return lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1;
    }

    get ver1() {
        return this.#ver1;
    }

    get ver2() {
        return this.#ver2;
    }

    get ver3() {
        return this.#ver3;
    }

    equals(triangulo) {
        return (this.#ver1.equals(triangulo.ver1) && this.#ver2.equals(triangulo.ver2) && this.#ver3.equals(triangulo.ver3));
    }

    get perimetro(){
        return (this.#ver1.distancia(this.#ver2) + this.#ver2.distancia(this.#ver3) + this.#ver3.distancia(this.#ver1));
    }

    tipo(){
        const l1 = this.#ver1.distancia(this.#ver2);
        const l2 = this.#ver2.distancia(this.#ver3);
        const l3 = this.#ver3.distancia(this.#ver1);

        if (l1 === l2 && l2 === l3) return 'Tipo equilátero';
        else if(l1 === l2 || l1 === l3 || l2 === l3) return 'Tipo isósceles';
        else return 'Tipo escaleno'
    }

    clone(){
        return new Triangulo(this.#ver1, this.#ver2, this.#ver3);
    }

    get area() {
        const s = this.perimetro / 2;
        const l1 = this.#ver1.distancia(this.#ver2);
        const l2 = this.#ver2.distancia(this.#ver3);
        const l3 = this.#ver3.distancia(this.#ver1);
        return Math.sqrt(s * (s - l1) * (s - l2) * (s - l3));
    }
}
module.exports = Triangulo;