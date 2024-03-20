# Desafio #1.2 - Administração da Agenda de um Consultório Odontológico

Este projeto é uma aplicação de agendamento de consultas para um Consultório Odontológico. Ele é estruturado em torno da classe `Agenda`, que contém vários métodos para gerenciar consultas e pacientes.

## Estrutura do Código

O código é estruturado em torno da classe `Agenda`, que contém uma lista de consultas e uma lista de pacientes. Cada consulta e paciente é representado como um objeto com várias propriedades.

A classe `Agenda` é responsável por gerenciar as consultas e pacientes. Ela contém métodos para adicionar, remover e listar consultas e pacientes, bem como para verificar se um paciente está registrado e se uma consulta está marcada.

[Diagrama de Classes](./Diagrama.pdf)

## Métodos da Agenda

Aqui estão os principais métodos da classe `Agenda`:

- `cadastrarPaciente(paciente)`: Este método adiciona um novo paciente à lista de pacientes. Ele verifica se o paciente já está registrado antes de adicioná-lo.

- `excluirPaciente(cpf)`: Este método remove um paciente da lista de pacientes. Ele verifica se o paciente está registrado e se ele tem alguma consulta marcada antes de removê-lo.

- `agendarConsulta(consulta)`: Este método adiciona uma nova consulta à lista de consultas. Ele verifica se o paciente está registrado e se a consulta não coincide com uma consulta existente.

- `cancelarAgendamento(consulta)`: Este método remove uma consulta da lista de consultas. Ele verifica se a consulta existe antes de removê-la.

- `listarPacientesPorCPF()`, `listarPacientesPorNome()`: Estes métodos retornam a lista de pacientes ordenada por CPF ou nome, respectivamente.

- `listarAgenda()`: Este método retorna a lista de consultas ordenada por data.

- `acharPaciente(cpf)`: Este método procura um paciente na lista de pacientes usando o CPF.

- `acharConsulta(cpfPaciente, dataConsulta, horaInicial)`: Este método procura uma consulta na lista de consultas usando o CPF do paciente, a data da consulta e a hora inicial.

## Validação

A validação é realizada em duas partes principais do código: na classe `Validação` e na classe `Agenda`.

Na classe `Validação`, as validações são focadas na entrada de dados. Ela verifica se os dados inseridos estão no formato correto. Por exemplo, ela verifica se o CPF é válido, se a data e a hora da consulta estão no formato correto, entre outros.

Na classe `Agenda`, as validações são focadas nos dados já presentes na agenda. Por exemplo, ela verifica se o paciente já está registrado antes de adicionar uma nova consulta, se a consulta existe antes de ser cancelada, se a consulta não coincide com uma consulta existente, e se o paciente tem alguma consulta marcada antes de ser removido.

Se alguma dessas condições não for atendida, o método retorna um objeto com `status: false` e um código de erro.

## Como Rodar o Código

Para rodar o código, você pode usar o `NPM`. Para isso, primeiro você deve navegar até o diretório do projeto no terminal (/desafio#1.2). Depois, você pode usar o comando ```npm run desafio#1-2```. Isso irá iniciar a aplicação e você poderá interagir com ela através do terminal.
Ou então usar o próprio `node` e executar o arquivo `ui.js` presente no package view. 
