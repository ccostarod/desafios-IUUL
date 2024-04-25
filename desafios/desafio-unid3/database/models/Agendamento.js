import { Model, DataTypes } from "sequelize";

class Agendamento extends Model {
    static init(sequelize) {
        return super.init({
            data: DataTypes.DATEONLY,
            horaInicio: DataTypes.TIME,
            horaFim: DataTypes.TIME
        }, { sequelize });
    }

    static associate(models) {
        this.belongsTo(models.Paciente, { foreignKey: 'pacienteId', as: 'pacientes' });
    }
}

export default Agendamento;