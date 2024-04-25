function filterDriversByTeam(drivers, teamName) {
  const normalizedTeamName = teamName.trim().toLowerCase(); // Normaliza el nombre del equipo eliminando espacios al inicio y al final y convirtiéndolo a minúsculas
  return drivers.filter((driver) => {
      const normalizedTeams = driver.teams.map(team => team.trim().toLowerCase()); // Normaliza los nombres de los equipos en los datos del conductor
      return normalizedTeams.includes(normalizedTeamName);
  });
}

module.exports = {
  filterDriversByTeam
}
  