const axios = require("axios");
const { Driver, Teams } = require("../db.js");
const { mapDivers } = require("../auxiliares/map");


const getDrivers = async () => {

    const response = await axios.get("http://localhost:5000/drivers");
    const driversApi = response.data

    const driversDb = await Driver.findAll({include: Teams});

    const allDrivers = driversDb.concat(driversApi);

    return mapDivers(allDrivers);
}

module.exports = {
    getDrivers
}