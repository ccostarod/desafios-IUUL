var readline = require('readline-sync');
const Vertice = require('../classes/Vertice');

function lerValorVertice(valor1, valor2){
    return parseFloat(readline.question(`Digite o valor ${valor1} do vertice ${valor2}: `))
};

const vertices = [];
for (let i = 0; i <3; i++){
    const x = lerValorVertice('x', i+1);
    const y = lerValorVertice('y', i+1);
    vertices.push(new Vertice(x, y));
}

console.log(`Distância entre vértice1 e vértice2: ${vertices[0].distancia(vertices[1])}`);
console.log(`Distância entre vértice2 e vértice3: ${vertices[1].distancia(vertices[2])}`);

console.log(`Vértice 1 estava na posição (${vertices[0].x}, ${vertices[0].y})`);
vertices[0].move(6, 7); //Movendo vertice 1
console.log(`Vértice 1 foi movido para a posição (${vertices[0].x}, ${vertices[0].y})`);


console.log(`Vértice 1 e vértice 2 são iguais? ${vertices[0].equals(vertices[1])}`);