// auxiliar/filterDriversBySource.js

const filterDriversBySource = (drivers, source) => {
    const filteredDrivers = [];
  
    for (const driver of drivers) {
      let isFromDb = false;
  
      if (driver.id && typeof driver.id === "string") {
        isFromDb = true;
      } else if (driver.id && typeof driver.id === "number") {
        isFromDb = false;
      } else {
        isFromDb = false;
      }
  
      if (source === "db" && isFromDb) {
        filteredDrivers.push(driver); // Agregar conductor de la base de datos
      } else if (source === "api" && !isFromDb) {
        filteredDrivers.push(driver); // Agregar conductor de la API
      }
    }
  
    return filteredDrivers;
  };
  
  module.exports = {
    filterDriversBySource,
  };
  