const axios = require("axios");
const { Driver, Teams } = require("../db.js");
const { filterDriversByTeam } = require("../auxiliares/teamsFilter");
const { filterDriversBySource } = require("../auxiliares/sourceFilter");
const { mapDrivers } = require("../auxiliares/map");

const ITEMS_PER_PAGE = 9;

const getDriversDb = async () => {
  const driversDb = await Driver.findAll({
    include: {
      model: Teams,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //console.log(driversDb)
  return driversDb;
};

const getDriversApi = async () => {
  const { data } = await axios.get("http://localhost:5000/drivers");
  return data;
};

const getDrivers = async (name,teamName, source ) => {
  const driversDb = await getDriversDb();
  const driversApi = await getDriversApi();
  const allDrivers = [...driversDb, ...driversApi];
  const filteredDriversSource = [];

  
  if (name) {
    const driverFound = allDrivers.filter((driver) => {
      if (driver.name) {
        if (typeof driver.name === "string") {
          return driver.name.toLowerCase().includes(name.toLowerCase());
        } else if (driver.name.forename) {
          const fullName = `${driver.name.forename} `;
          return fullName.toLowerCase().includes(name.toLowerCase());
        }
      }
      return false;
    });
    
    if (driverFound.length > 0) {
      return mapDrivers(driverFound.slice(0, ITEMS_PER_PAGE));
    } else {
      return { error: "No se encontraron conductores con ese nombre" };
    }
  } //esta ok
  
  if (teamName) {
    const mappedDrivers = mapDrivers(allDrivers);
        
    const filterDriversTeam = filterDriversByTeam(mappedDrivers, teamName);
    return filterDriversTeam;
  } //esta ok

  if (source) {
    const filteredDrivers = filterDriversBySource(allDrivers, source);
    return mapDrivers(filteredDrivers.slice(0, ITEMS_PER_PAGE));
  } else {
    return mapDrivers(allDrivers.slice(0, ITEMS_PER_PAGE));
  }

  
   return mapDrivers(allDrivers);
};

module.exports = {
  getDrivers,
};
