const express = require("express");
const app = express();
const db = require("./db");
const models = require("./models");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const setHeaders = require("./middleware/setHeaders")
const corsConfig = require("./config/cors");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(cookieParser());

// Express Routes File Requires
app.use(express.json());
app.use("/", setHeaders);
app.use(cors(corsConfig));

// Express Routing
app.use("/api", routes);


db.sync({force: true})
  .then(function () {
    console.log("DB Connected");
    app.listen(PORT, () =>
      console.log(`Server listened at port ${PORT}`)
    );
  })
  .catch((error) => console.log("ERR", error));