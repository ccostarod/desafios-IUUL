var readline = require('readline-sync');

function obterNome() {
    let nome = readline.question('Digite o nome (pelo menos 5 caracteres): ');
    if (nome.length < 5) {
        console.log('Nome invalido. Deve ter pelo menos 5 caracteres.');
        return undefined;
    }
    return nome;
}

function obterCPF() {
    let cpf = readline.question('Digite o CPF (exatamente 11 digitos): ');
    if (cpf.length !== 11) {
        console.log('CPF invalido. Deve ter exatamente 11 digitos.');
        return undefined;
    }
    return cpf;
}

function obterDataNascimento() {
    let dataNascimento = readline.question('Digite a data de nascimento (DD/MM/AAAA, pelo menos 18 anos): ');
    var partesData = dataNascimento.split('/');
    var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    var idade = new Date().getFullYear() - data.getFullYear();
    if (idade < 18) {
        console.log('Data de nascimento invalida. O cliente deve ter pelo menos 18 anos e o formato deve ser (DD/MM/AAAA).');
        return undefined;
    }
    return data;
}

function obterRendaMensal() {
    let rendaMensal = readline.question('Digite a renda mensal (valor com duas casas decimais): ');
    if (!rendaMensal.includes('.') || rendaMensal.split('.')[1].length !== 2) {
        console.log('Renda mensal invalida. Deve ser um valor com duas casas decimais.');
        return undefined;
    }
    return parseFloat(rendaMensal);
}

function obterEstadoCivil() {
    let estadoCivil = readline.question('Digite o estado civil (C, S, V ou D): ').toUpperCase();
    if (!['C', 'S', 'V', 'D'].includes(estadoCivil)) {
        console.log('Estado civil invalido. Deve ser C, S, V ou D.');
        return undefined;
    }
    return estadoCivil;
}

function obterDependentes() {
    let dependentes = readline.question('Digite o numero de dependentes (0 a 10): ');
    if (dependentes < 0 || dependentes > 10) {
        console.log('Número de dependentes invalido. Deve ser entre 0 e 10.');
        return undefined;
    }
    return parseInt(dependentes);
}


function imprimirDadosCliente(cliente) {
    if (cliente.nome === undefined) {
        console.log('\nNome: Dado não foi passado da maneira correta');
    } else {
        console.log(`\nNome: ${cliente.nome}`);
    }

    if (cliente.cpf === undefined) {
        console.log('CPF: Dado não foi passado da maneira correta');
    } else {
        console.log(`CPF: ${cliente.cpf.slice(0, 3)}.${cliente.cpf.slice(3, 6)}.${cliente.cpf.slice(6, 9)}-${cliente.cpf.slice(9, 11)}`);
    }

    if (cliente.dataNascimento === undefined) {
        console.log('Data de Nascimento: Dado não foi passado da maneira correta');
    } else {
        console.log(`Data de Nascimento: ${cliente.dataNascimento.getDate()}/${cliente.dataNascimento.getMonth() + 1}/${cliente.dataNascimento.getFullYear()}`);
    }

    if (cliente.rendaMensal === undefined) {
        console.log('Renda Mensal: Dado não foi passado da maneira correta');
    } else {
        console.log(`Renda Mensal: ${cliente.rendaMensal.toFixed(2)}`);
    }

    if (cliente.estadoCivil === undefined) {
        console.log('Estado Civil: Dado não foi passado da maneira correta');
    } else {
        console.log(`Estado Civil: ${cliente.estadoCivil}`);
    }

    if (cliente.dependentes === undefined) {
        console.log('Dependentes: Dado não foi passado da maneira correta');
    } else {
        console.log(`Dependentes: ${cliente.dependentes}`);
    }
}

var cliente = {
    nome: obterNome(),
    cpf: obterCPF(),
    dataNascimento: obterDataNascimento(),
    rendaMensal: obterRendaMensal(),
    estadoCivil: obterEstadoCivil(),
    dependentes: obterDependentes()
};

imprimirDadosCliente(cliente);