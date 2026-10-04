require('dotenv').config();

function databaseConfig() {
  return {
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_NAME ?? 'learn2code',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || 'mysql'
  };
}

module.exports = {
  development: databaseConfig(),
  test: databaseConfig(),
  production: databaseConfig()
};
