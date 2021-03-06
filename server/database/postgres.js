const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);

let connection;

if (process.env.NODE_ENV === 'production') {
  connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
} else if (process.env.NODE_ENV === 'test') {
  connection = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE_TEST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10
  };
} else {
  connection = {
    host: process.env.HOST || '18.224.21.61',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'reviews',
    user: process.env.DB_USER || 'wjl77',
    password: process.env.DB_PASSWORD || 'password',
    max: 10,
    query_timeout: 4000
  };
}

const db = pgp(connection);

module.exports = db;
