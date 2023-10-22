const { Router } = require("express");
const driversRouter = require("./driversRouter");
//const { getTeams } = require("../controllers/getTeams");

const router = Router();

router.use("/drivers", driversRouter)
//router.use("/teams", teamsRouter)


module.exports = router;
