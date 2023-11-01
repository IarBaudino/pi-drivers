const axios = require("axios");
const { Driver, Teams } = require("../db");
const { mapDrivers } = require("../auxiliares/map");


const createDriver = async (name, lastName, description, image, teams, nationality, birthDate) => {
    const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];
    const newDriver = await Driver.create({
        name,
        lastName,
        description,
        image,
        nationality,
        birthDate: formattedBirthDate
    })

    teams.forEach(async (teams) => {
        let teamsDb=await Teams.findAll({
            where: {
                name: [teams]
            },
        });
        
        await newDriver.addTeams(teamsDb); 
    });

    const team = await Teams.findAll({
        where: {
            name: teams
        }
    })

    await newDriver.addTeams(team);

   
    return mapDrivers( newDriver);
}

module.exports = {
    createDriver
}