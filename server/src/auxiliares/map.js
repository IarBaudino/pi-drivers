const mapDrivers = (drivers) => {
  return drivers.map((driver) => {
    if (driver) {
      let isFromDb = false;

      if (driver.id && typeof driver.id === "string") {
        isFromDb = true;
      } else if (driver.id && typeof driver.id === "number") {
        isFromDb = false;
      } else {
        isFromDb = false;
      }

      let teams = [];

      if (driver.Teams && Array.isArray(driver.Teams)) {
        teams = driver.Teams.map((team) => team.name);
      } else if (typeof driver.teams === "string") {
        teams = driver.teams.split(",").map((team) => team.trim());
      } else {
        teams = driver.teams || [];
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
  }).filter((driver) => driver !== null);
};

module.exports = {
  mapDrivers,
};
