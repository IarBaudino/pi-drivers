const {getTeams} = require("../controllers/getTeams");

const getTeamsHandler = async (req, res) => {
    const {teams}= req.query;

    try{
        const allTeams = await getTeams(teams);
        res.status(200).json(allTeams);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTeamsHandler
}