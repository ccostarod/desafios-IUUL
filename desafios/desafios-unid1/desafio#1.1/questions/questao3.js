const readline = require('readline-sync');
const Poligono = require('../classes/Poligono');
const Vertice = require('../classes/Vertice');

let vertices = [];

let n = readline.question('Quantos vertices o poligono tera? ');

for (let i = 0; i < n; i++) {
    console.log(`Insira as coordenadas para o Vertice ${i + 1}:`);
    let x = readline.question('x: ');
    let y = readline.question('y: ');

    const vertice = new Vertice(parseFloat(x), parseFloat(y));
    vertices.push(vertice);
}

const poligono = new Poligono(...vertices);

console.log(`Perimetro do poligono: ${poligono.perimetro}`);
console.log(`Quantidade de vertices: ${poligono.qtdVertices}`);

console.log('Adicionando um novo vertice ao poligono...');
let x = readline.question('x: ');
let y = readline.question('y: ');

const novoVertice = new Vertice(parseFloat(x), parseFloat(y));
if (poligono.addVertice(novoVertice)) {
    console.log('Vertice adicionado com sucesso!');
} else {
    console.log('Vertice ja existe no poligono.');
}

console.log(`Perimetro do poligono apos adicionar o novo vertice: ${poligono.perimetro}`);
console.log(`Quantidade de vertices apos adicionar o novo vertice: ${poligono.qtdVertices}`);