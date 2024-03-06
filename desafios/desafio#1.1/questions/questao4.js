var Turma = require('../classes/Turma');
var readline = require('readline-sync');
var turma = new Turma();

function adicionarAluno(matricula, nome) {
    return turma.adicionarAluno(matricula, nome);
}

function adicionarNota(matricula, nota, tipo) {
    return turma.lancarNota(matricula, nota, tipo);
}

function removerAluno(matricula) {
    return turma.removerAluno(matricula);
}

function listarAlunos() {
    return turma.imprimir();
}

do {
    console.log('\n1. Adicionar aluno');
    console.log('2. Adicionar nota');
    console.log('3. Remover aluno');
    console.log('4. Listar alunos');
    console.log('5. Sair');
    var opcao = readline.question('Escolha uma opcao: ');

    switch(opcao) {
        case '1':
            var matricula = readline.question('Digite a matricula do aluno: ');
            var nome = readline.question('Digite o nome do aluno: ');
            adicionarAluno(matricula, nome);
            break;
        case '2':
            var matricula = readline.question('Digite a matricula do aluno: ');
            var nota = readline.question('Digite a nota do aluno: ');
            var tipo = readline.question('Digite o tipo da nota (1 ou 2): ');
            adicionarNota(matricula, parseFloat(nota), parseInt(tipo));
            break;
        case '3':
            var matricula = readline.question('Digite a matricula do aluno que deseja remover: ');
            removerAluno(matricula);
            break;
        case '4':
            listarAlunos();
            break;
        case '5':
            console.log('Saindo...');
            break;
        default:
            console.log('Opção inválida!');
    }
} while (opcao !== '5');