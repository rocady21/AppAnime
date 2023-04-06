const {response} = require("express")
const Animes = require("../modelsBD/Animes")

const ValidarID = async (req,res= response,next)=> {

const animeUid = req.header("animeUid")

try {
        const animeuidExist = await Animes.findOne({_id:animeUid})

        // checkear si hay un anime con ese id
        if(!animeuidExist) {
            throw new Error("No hay animes con ese id")
        } 

        req.uid = animeuidExist._id
        next()
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:"no hay anime con ese id"
        })
    }

}

module.exports = {
    ValidarID
}