import { Sequelize, DataTypes } from "sequelize";
import config from "../config/database.js"
import Paciente from "./models/Paciente.js";

const connection = new Sequelize(config);

Paciente.init(connection);

export async function syncDb() {
  await connection.sync({ force: true });
}

export { Paciente };
