const filterDriversByName = (drivers, name) => {
    return drivers.filter((driver) => {
        const driverName = `${driver.name}`.toLowerCase();
        const searchName = name.toLowerCase();
        return driverName.includes(searchName);
    });
};

module.exports = {
    filterDriversByName
}