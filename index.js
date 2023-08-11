//imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

require("ejs");

//importar la instancia de la conexion a la db

const { sequelize } = require("./db");

//conexion a la db

sequelize
  .authenticate()
  .then(() => console.log("conexion a la base de datos exitosa"))
  .catch((error) =>
    console.log("Error a la conexion a la base de datos", error)
  );

const app = express();
const port = process.env.PORT || 5500;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

//routes

// escuche el puerto
app.listen(port, () => console.log(`Server on http://localhost:${port}`));
