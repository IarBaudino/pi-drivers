const {getTeams} = require("../controllers/getTeams");

const getTeamsHandler = async (req, res) => {
    try{
        const response = await getTeams();
        res.status(200).json(response);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTeamsHandler
}