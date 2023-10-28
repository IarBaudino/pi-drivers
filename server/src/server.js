const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());

// Configura el middleware de CORS para permitir todas las solicitudes (menos seguro en producción)
server.use(cors({ origin: '*' }));

server.use(router);

module.exports = server;
