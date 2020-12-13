module.exports = {
  development: {
    host: 'postgres_host',
    port: 5432,
    username: 'app_server',
    password: 'qwerty',
    database: 'db',
    dialect: 'postgres',
  },
  test: {
    host: 'localhost',
    port: 5432,
    password: null,
    username: 'postgres',
    database: 'squadhelp-test-2',
    dialect: 'postgres',
    logging: false,
  },
  production: {},
};
