const readline = require('readline-sync');
const Triangulo = require('../classes/Triangulo');
const Vertice = require('../classes/Vertice');

let triangulos = [];

for (let i = 0; i < 3; i++) {
    console.log(`Insira as coordenadas para o Triangulo ${i + 1}:`);
    let x1 = readline.question('Vertice 1 x: ');
    let y1 = readline.question('Vertice 1 y: ');
    let x2 = readline.question('Vertice 2 x: ');
    let y2 = readline.question('Vertice 2 y: ');
    let x3 = readline.question('Vertice 3 x: ');
    let y3 = readline.question('Vertice 3 y: ');

    const ver1 = new Vertice(parseFloat(x1), parseFloat(y1));
    const ver2 = new Vertice(parseFloat(x2), parseFloat(y2));
    const ver3 = new Vertice(parseFloat(x3), parseFloat(y3));
    const triangulo = new Triangulo(ver1, ver2, ver3);
    triangulos.push(triangulo);
}

triangulos.forEach((triangulo, i) => {
    console.log(`Triangulo ${i + 1}:`);
    console.log(`Perimetro: ${triangulo.perimetro}`);
    console.log(`Area: ${triangulo.area}`);
    console.log(`Tipo: ${triangulo.tipo()}`);
});

if (triangulos[0].equals(triangulos[1])) {
    console.log('O primeiro triângulo é igual ao segundo.');
} else {
    console.log('O primeiro triangulo nao eh igual ao segundo.');
}

let clone = triangulos[0].clone();
console.log(`Clone do primeiro triangulo: Perimetro = ${clone.perimetro}, Area = ${clone.area}, Tipo = ${clone.tipo()}`);