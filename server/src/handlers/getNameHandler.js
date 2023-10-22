const {getName} = require("../controllers/getName");

const getNameHandler = async (req, res) => {
    const {name} = req.query;
    try {
        const drivers = await getName(name);
        res.status(200).json(drivers);
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getNameHandler
}