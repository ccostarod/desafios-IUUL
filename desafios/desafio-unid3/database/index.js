import { Sequelize, DataTypes } from "sequelize";
import config from "../config/database.js"
import Paciente from "./models/Paciente.js";
import MenuPresenter from "../presenter/MenuPresenter.js"
import MainController from "../controller/MainController.js";
import Agendamento from "./models/Agendamento.js";

const connection = new Sequelize(config);

connection.authenticate()
    .then(() => console.log('Conexao estabelecida.'))
    .catch(error => console.error('Erro ao conectar ao banco de dados:', error));

Paciente.init(connection);
Agendamento.init(connection);

Paciente.associate(connection.models);
Agendamento.associate(connection.models);

export async function syncDb() {
  
}

async function main() {
  await connection.sync();
  const presenter = new MenuPresenter(new MainController());
  await presenter.run();
}
main();


