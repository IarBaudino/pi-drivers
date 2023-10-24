const {Router} = require("express");
const {getDriversHandler} = require("../handlers/getDriversHandler");
const {getIdHandler} = require("../handlers/getIdHandler");
const {createDriversHandler} = require("../handlers/postDriverHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getIdHandler);
driversRouter.post("/", createDriversHandler);


module.exports = driversRouter;