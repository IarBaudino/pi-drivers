const axios = require("axios");
const { Teams } = require("../db");

const URL = "http://localhost:5000/drivers";

const cleanTeams = (drivers) => {
  const teams = [];
  drivers.forEach((driver) => {
    if (driver.teams) {
      const teamsArray = driver.teams.split(",").map((team) => team.trim());
      teamsArray.forEach((team) => {
        if (team.length > 0 && !teams.includes(team)) {
          teams.push(team);
        }
      });
    }
  });
  return teams;
};

const getTeams = async () => {
    
  };
module.exports = { getTeams };