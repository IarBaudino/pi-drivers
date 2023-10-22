const mapDivers = (drivers) => {
    return drivers.map((driver) => {
        if (driver) {
            let teams;
            if (typeof driver.id === "string") {//comprueba que el id sea un string
                teams = driver.teams?.split(',').map((team) => team.trim()) || []; //si el id es un string, separa los equipos por coma en un array
            } else {
                teams = driver.teams || [];
            }
            return {
                id: driver.id,
                name: driver.name.forename,
                lastName: driver.name.surname,
                description: driver.description,
                image: driver.image.url,
                teams: teams,
                nationality: driver.nationality,
                birthDate: driver.dob,
                isFromDb: typeof driver.id === 'string'
            };
        } else {
            return null;
        }
    }).filter(driver => driver !== null); //elimina todos los elementos nulos de la lista de conductores, de modo que obtenemos una lista limpia de conductores válidos.
}

module.exports = {
    mapDivers,
}