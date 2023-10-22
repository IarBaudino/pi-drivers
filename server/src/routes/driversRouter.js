const {Router} = require("express");
const {getDriversHandler} = require("../handlers/getDriversHandler");
const {getIdHandler} = require("../handlers/getIdHandler");
const {getNameHandler} = require("../handlers/getNameHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getIdHandler);
driversRouter.get("/name", getNameHandler);



module.exports = driversRouter;