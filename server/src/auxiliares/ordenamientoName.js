const sortByAlphabetical = (drivers, order) => {
    const sortedDrivers = [...drivers];
    if(order === "asc"){
        sortedDrivers.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }else if(order === "desc"){
        sortedDrivers.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
    }
    return sortedDrivers
}
  
  
  
  // Export the functions for use in other modules
  module.exports = {
    sortByAlphabetical
  };
  