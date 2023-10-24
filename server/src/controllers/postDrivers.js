const axios = require("axios");
const { Driver, Teams } = require("../db");
const { mapDrivers } = require("../auxiliares/map");


const createDriver = async (name, lastName, description, image, teams, nationality, birthDate) => {
    const newDriver = await Driver.create({
        name,
        lastName,
        description,
        image,
        nationality,
        birthDate
    })

    const team = await Teams.findAll({
        where: {
            name: teams
        }
    })

    await newDriver.addTeams(team);

    await newDriver.reload({
        include: {
            model: Teams,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
    return mapDrivers( newDriver);
}

module.exports = {
    createDriver
}