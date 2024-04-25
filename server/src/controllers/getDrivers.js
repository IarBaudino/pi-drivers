const axios = require("axios");
const { Driver, Teams } = require("../db.js");
const { filterDriversByTeam } = require("../auxiliares/teamsFilter");
const { filterDriversBySource } = require("../auxiliares/sourceFilter");
const { mapDrivers } = require("../auxiliares/map");
const { sortDrivers } = require("../auxiliares/order");

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
  return driversDb;
};

const getDriversApi = async () => {
  const { data } = await axios.get("http://localhost:5000/drivers");
  return data;
};

const getDrivers = async (name, teamName, source, sortBy, sortOrder) => {
  let allDrivers = [];
  
  // Obtener conductores de la base de datos y la API
  const driversDb = await getDriversDb();
  const driversApi = await getDriversApi();
  
  // Combinar conductores de la base de datos y la API
  allDrivers = [...driversDb, ...driversApi];
  
  // Filtrar conductores por nombre si se proporciona el parámetro
  if (name) {
    let filteredDrivers = allDrivers.filter((driver) => {
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
  
    // Ordenar los conductores filtrados por nombre
    filteredDrivers = sortDrivers(filteredDrivers, sortBy, sortOrder);
  
    if (filteredDrivers.length > 0) {
      return mapDrivers(filteredDrivers);
    } else {
      return { error: "No se encontraron conductores con ese nombre" };
    }
  }

  // Filtrar conductores por equipo si se proporciona el parámetro
  if (teamName) {
    const mappedDrivers = mapDrivers(allDrivers);
    const filterDriversTeam = filterDriversByTeam(mappedDrivers, teamName);
    allDrivers = filterDriversTeam;
  }

  // Filtrar conductores por fuente si se proporciona el parámetro
  if (source) {
    const filteredDrivers = filterDriversBySource(allDrivers, source);
    allDrivers = filteredDrivers;
  }
  
  // Ordenar conductores si se proporcionan los parámetros de ordenamiento
  if (sortBy && sortOrder) {
    allDrivers = sortDrivers(allDrivers, sortBy, sortOrder);
  }

  // Mapear y devolver conductores
  return mapDrivers(allDrivers);
};

module.exports = {
  getDrivers,
};