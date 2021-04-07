const Pool = require('pg').Pool;
require('dotenv').config();

const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;
const dbDatabase = process.env.PGDATABASE;
const dbPort = process.env.PGPORT;

const config = {
  user: dbUser,
  password: dbPassword,
  host: 'localhost',
  port: dbPort,
  database: dbDatabase,
  ssl: true,
};

const pool = new Pool(config);

module.exports = pool;
