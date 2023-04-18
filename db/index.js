const Sequelize = require("sequelize")
const {
  DB_LOCAL_NAME,
  DB_LOCAL_USER_NAME,
  DB_LOCAL_PASSWORD,
  DB_PRODUCTION_NAME,
  DB_PRODUCTION_USER_NAME,
  DB_PRODUCTION_PASSWORD,
  DB_PRODUCTION_HOST,
} = require("../config/envs");

const db =
  process.env.NODE_ENV === "production"
    ? new Sequelize(`${DB_PRODUCTION_NAME}`, `${DB_PRODUCTION_USER_NAME}`, `${DB_PRODUCTION_PASSWORD}`, {
        host: `${DB_PRODUCTION_HOST}`,
        dialect: "postgres",
        logging: false,
      })
    : new Sequelize(`${DB_LOCAL_NAME}`, `${DB_LOCAL_USER_NAME}`, `${DB_LOCAL_PASSWORD}`, {
        host: "localhost",
        dialect: "postgres",
        logging: false,
      });

module.exports = db;