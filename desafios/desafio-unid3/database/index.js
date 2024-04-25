import { Sequelize, DataTypes } from "sequelize";
import config from "../config/database.js"
import Paciente from "./models/Paciente.js";
import MenuPresenter from "../presenter/MenuPresenter.js"
import MainController from "../controller/MainController.js";
import Agendamento from "./models/Agendamento.js";

const connection = new Sequelize(config);

Paciente.init(connection);
Agendamento.init(connection);

Paciente.associate(connection.models);
Agendamento.associate(connection.models);

export async function syncDb() {
  
}

async function teste() {
  await connection.sync();
  const presenter = new MenuPresenter(new MainController());
  await presenter.run();
}
teste();


