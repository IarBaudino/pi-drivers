const { Teams } = require("../db");
const axios = require("axios");
const URL = "http://localhost:5000/drivers";

const cleanTeams = (drivers) => {
  const uniqueTeams = new Set();

  drivers.forEach((driver) => {
    if (driver.teams) {
      const teamsArray = driver.teams.split(",").map((team) => team.trim());
      teamsArray.forEach((team) => {
        if (team.length > 0) {
          uniqueTeams.add(team);
        }
      });
    }
  });

  return [...uniqueTeams];
};

const getTeams = async () => {
  const response = await axios(URL);
  const teams = cleanTeams(response.data);

  const teamsInDB = await Teams.findAll();

  if (teamsInDB.length === 0) {
    // La base de datos está vacía, así que creamos los equipos
    await Promise.all(
      teams.map(async (team) => {
        try {
          const [newTeam, created] = await Teams.findOrCreate({
            where: { name: team },
            defaults: { name: team },
          });

          if (created) {
            console.log(`Equipo creado: ${team}`);
          } else {
            console.log(`Equipo ya existente: ${team}`);
          }
        } catch (error) {
          console.error(`Error al crear el equipo ${team}:`, error);
        }
      })
    );
  }

  return teams;
};

module.exports = { getTeams };