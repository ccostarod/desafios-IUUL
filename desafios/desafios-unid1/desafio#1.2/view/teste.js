const { Table } = require('console-table-printer');

// Exemplo de dados
const listagemPacientes = [
    { CPF: '99999999999', Nome: 'Paciente 1', DtNasc: '01/01/1990', Idade: 32 },
    { CPF: '88888888888', Nome: 'Paciente 2', DtNasc: '02/02/1980', Idade: 42 }
];

const listagemConsultas = [
    { CPF: '99999999999', Data: '20/03/2024', Horario: '10:00', Medico: 'Dr. João' },
    { CPF: '88888888888', Data: '22/03/2024', Horario: '15:30', Medico: 'Dr. Maria' }
];

// Função para formatar a lista de pacientes e consultas
function formatarDados(pacientes, consultas) {
    const dadosFormatados = [];
    pacientes.forEach(paciente => {
        dadosFormatados.push(paciente);
        const consulta = consultas.find(consulta => consulta.CPF === paciente.CPF);
        if (consulta) {
            dadosFormatados.push({ Nome: `Consulta agendada para: ${consulta.dataConsulta} \n ${consulta.horaInicial} as ${consulta.horaFinal}` });
        }
        dadosFormatados.push({}); // Adiciona uma linha vazia entre os pacientes
    });
    return dadosFormatados;
}

// Formatar os dados
const dadosFormatados = formatarDados(listagemPacientes, listagemConsultas);

// Configurar e imprimir a tabela
const table = new Table({
    columns: [
        { name: 'CPF', alignment: 'left' },
        { name: 'Nome', alignment: 'left' },
        { name: 'DtNasc', alignment: 'left' },
        { name: 'Idade', alignment: 'right' }
    ]
});

table.addRows(dadosFormatados);
table.printTable();