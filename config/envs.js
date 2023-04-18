require("dotenv").config();

module.exports = {
  DB_LOCAL_NAME: process.env.DB_LOCAL_NAME,
  DB_LOCAL_USER_NAME: process.env.DB_LOCAL_USER_NAME || null,
  DB_LOCAL_PASSWORD: process.env.DB_LOCAL_PASSWORD || null,
  DB_PRODUCTION_NAME: process.env.DB_PRODUCTION_NAME,
  DB_PRODUCTION_USER_NAME: process.env.DB_PRODUCTION_USER_NAME,
  DB_PRODUCTION_PASSWORD: process.env.DB_PRODUCTION_PASSWORD,
  DB_PRODUCTION_HOST: process.env.DB_PRODUCTION_HOST,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
