function filterDriversByTeam(drivers, teamName) {
    return drivers.filter((driver) => driver.teams.includes(teamName));
  }

  module.exports = {
    filterDriversByTeam
  }
  
  