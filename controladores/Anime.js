const {response} = require("express")
const Animes = require("../modelsBD/Animes")


const CrearAnime = async(req,res = response)=> {
    
    const anime = new Animes(req.body)

    await anime.save()

    res.json({
        ok:true,
        msg:"Anime Creado",
        nombre: anime.name
    })
}

const ListAnime = async(req,res = response)=> {

    const animes = await Animes.find();

    if(!animes) {
        res.status(400).json({
            msg:"No hay animes que obtener"
        })
    }

    res.json({
        animes:animes
    })
    
}

const ListadoAnime = async(req,res = response) => {

    const {name} = req.body 

    const animes = Animes.find({name:name})
    if(!animes) {
        return res.status(400).json({
            ok:false,
            msg:"No hay anime con ese nombre"
        })
    }

    res.status(200).json({
        ok:true,
        animes
    })
    
}








module.exports= {
    CrearAnime,
    ListAnime,
    ListadoAnime
}