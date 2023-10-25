const mapDrivers = (drivers) => {
  return drivers.map((driver) => {
    if (driver) {
      let teams = [];
      let isFromDb = false;

      if (driver.id && typeof driver.id === "string") {
	isFromDb = true;
        // Si el id es un UUID, es un conductor de la base de datos
        if (driver.Teams && Array.isArray(driver.Teams)) {
          teams = driver.Teams.map((team) => team.name);
        }
      } else {
        // Si el id es un número, es un conductor de la API
        if (typeof driver.teams === 'string') {
          // Verificamos que 'driver.teams' sea una cadena antes de intentar dividirla
          teams = driver.teams.split(',').map((team) => team.trim());
        }
        if (typeof driver.name === 'string') {
          // Si el nombre es una cadena, no se puede dividir en nombre y apellido
          driver.name = { forename: driver.name, surname: driver.lastName };
        }
      }

      const name = driver.name.forename || driver.name;
      const lastName = driver.name.surname || driver.lastName;

      return {
        id: driver.id,
        name: name,
        lastName: lastName,
        description: driver.description,
        image: driver.image.url || driver.image,
        teams: teams,
        nationality: driver.nationality,
        birthDate: driver.dob || driver.birthDate,
        isFromDb: isFromDb,

      };
    } else {
      return null;
    }
  }).filter(driver => driver !== null);
};

module.exports = {
  mapDrivers
};

