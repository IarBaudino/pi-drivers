const mapDrivers = (drivers) => {
    return drivers.map((driver) => {
      if (driver) {
        let teams = [];
        if (driver.id && typeof driver.id === "string") {
          // Si el id es un UUID, es un controlador de la base de datos
          if (driver.Teams && Array.isArray(driver.Teams)) {
            teams = driver.Teams.map((team) => team.name);
          }
        } else {
          // Si el id es un número, es un controlador de la API
          if (driver.teams) {
            teams = driver.teams.split(',').map((team) => team.trim());
          }
          if (typeof driver.name === 'string') {
            // Si el nombre es una cadena, no se puede dividir en nombre y apellido
            driver.name = { forename: driver.name, surname: '' };
          }
        }
        const name = driver.name.forename || driver.name;
        const lastName = driver.name.surname || '';
        return {
          id: driver.id,
          name: name,
          lastName: lastName,
          description: driver.description,
          image: driver.image.url || driver.image,
          teams: teams,
          nationality: driver.nationality,
          birthDate: driver.dob || driver.birthDate,
          isFromDb: typeof driver.id === 'string',
        };
      } else {
        return null;
      }
    }).filter(driver => driver !== null);
  };
  
  module.exports = {
    mapDrivers
  };