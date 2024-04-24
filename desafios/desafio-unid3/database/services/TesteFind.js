import Paciente from "../index.cjs";

async function testDatabaseConnection() {
  try {
    const pacientes = await Paciente.findAll();
    console.log('Pacientes:', pacientes);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
  }
}

testDatabaseConnection();