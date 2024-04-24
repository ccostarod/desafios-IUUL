
export default {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'consultorio',
  define: {
    timestamps: true, // Criar de forma automática CreatedAt e UpdateAt
    underscored: true, // snake case
  }
};