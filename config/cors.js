const checkNodeEnvironment = require("../utils/checkNodeEnvironment");

const origin = checkNodeEnvironment("https://butterflix.vercel.app", "http://localhost:3000");

const corsConfig = {
  origin,
  credentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
};

module.exports = corsConfig;
