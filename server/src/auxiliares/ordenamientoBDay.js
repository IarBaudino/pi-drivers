const sortByBirthYear = (drivers, order) => {
    const sortedDrivers = [...drivers]; // Crear una copia para evitar modificar el original
  
    sortedDrivers.sort((driverA, driverB) => {
      // Extraer y formatear las fechas de nacimiento
      const birthDateA = new Date(driverA.birthDate || driverA.dob).getTime(); // Obtener el timestamp en milisegundos
      const birthDateB = new Date(driverB.birthDate || driverB.dob).getTime();
  
      if (order === "asc") {
        return birthDateA - birthDateB; // Orden ascendente (fecha más antigua primero)
      } else if (order === "desc") {
        return birthDateB - birthDateA; // Orden descendente (fecha más reciente primero)
      }
      return 0; // Fechas iguales
    });
  
    return sortedDrivers;
  };
  
  module.exports = {
    sortByBirthYear,
  };