
const {Router} = require("express")
const {check} = require("express-validator")
const router = Router();
const {CrearAnime,ListAnime, ListadoAnime,getAnimeById,setComentarios,getComentariosbyCap} = require("../controladores/Anime.js");
const { ValidarID } = require("../middlware/ValidarID.js");

// a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password


router.post("/new",CrearAnime)

router.get("/listA",ListAnime)

router.post("/getAnimebyId",getAnimeById )

router.put("/updateComentario",setComentarios)

router.post("/getComentariosbyCap",getComentariosbyCap)




module.exports=router;