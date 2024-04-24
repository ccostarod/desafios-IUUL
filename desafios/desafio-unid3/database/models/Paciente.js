import { Model, DataTypes } from "sequelize";

class Paciente extends Model {
    static init(sequelize) {
        return super.init({
            cpf: DataTypes.BIGINT,
            name: DataTypes.TEXT,
            dataNascimento: DataTypes.DATEONLY,
        }, { sequelize });
    }
}

export default Paciente;