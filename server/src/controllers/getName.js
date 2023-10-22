const axios = require("axios");
const { Op } = require("sequelize");
const { Driver, Team } = require("../db.js");
const { mapDivers } = require("../auxiliares/map");

const getName = async (name) => {
    const response = await axios.get("http://localhost:5000/drivers");
    const driversApi = response.data

    const driversDb = await Driver.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: Team
    })
};


module.exports = {
    getName
}