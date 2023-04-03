
const {Router} = require("express")
const {check} = require("express-validator")
const router = Router();
const {CrearAnime,ListAnime, ListadoAnime} = require("../controladores/Anime.js")

// a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password


router.post("/new",CrearAnime)

router.get("/listA",ListAnime)

router.post("/getAnimebyName",ListadoAnime )




module.exports=router;