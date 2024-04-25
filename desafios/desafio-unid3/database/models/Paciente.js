import { Model, DataTypes } from "sequelize";

class Paciente extends Model {
    static init(sequelize) {
        return super.init({
            cpf: DataTypes.BIGINT,
            name: DataTypes.TEXT,
            dataNascimento: DataTypes.DATEONLY,
        }, { sequelize });
    }
    static associate(models) {
        this.hasMany(models.Agendamento, { foreignKey: 'pacienteId', as: 'agendamentos' });
    }
}

export default Paciente;