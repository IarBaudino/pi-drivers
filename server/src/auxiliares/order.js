const { mapDrivers } = require("../auxiliares/map");
const sortDrivers = (drivers, sortBy, sortOrder) => {
    const mappedDrivers = mapDrivers(drivers);
    return mappedDrivers.sort((driver1, driver2) => {
      let comparisonValue = 0;
      if (sortBy === "name") {
        comparisonValue = driver1.name.localeCompare(driver2.name);
      } else if (sortBy === "birthDate") {
        const date1 = new Date(driver1.birthDate);
        const date2 = new Date(driver2.birthDate);
        comparisonValue = date1 - date2;
      }
      // Aplicar orden de clasificación
      return sortOrder === "asc" ? comparisonValue : -comparisonValue;
    });
  };

  module.exports = { sortDrivers };