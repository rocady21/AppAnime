const { Router } = require("express")
const { addNewPost, FilterPostByUser, ActualizarPost, LikeExist, DislikeExist, BorrarPost, filterPostById, addComentario, editComentario, deleteComentario, addLike, quitLike, addDislike, quitDislike, getCommentByPost } = require("../controladores/posts.js")
const { check } = require("express-validator")
const { validarCampos } = require("../middlware/validarCampos.js")
const { isNumber } = require("util")
const { isNumberObject } = require("util/types")
const router = Router()


router.post("/newPost", [
    //middlware
    check("Descripcion", "debe de ingresar una descripcion valida de minimo un caracter ").notEmpty(),
    check("Tipo", "Debe de espesificar que tipo de publicacion es, no se admiten numeros ni que el campo sea vacio").notEmpty(),
    validarCampos

], addNewPost)
router.post("/filterPost", FilterPostByUser)
router.put("/actualizarPost", ActualizarPost)
router.delete("/borrarPost", BorrarPost)
router.post("/filterPostById", filterPostById)
// comentarios 
router.put("/addComent", addComentario)
router.put("/editComment", editComentario)
router.put("/deleteComment", deleteComentario)
// evaluacion de si el like existe para saber que deisicion tomar
router.post("/LikeExist", LikeExist)
router.post("/DislikeExist", DislikeExist)
router.post("/getComentsByPost", getCommentByPost)



//interacciones de usuario(likes,dislikes, e quitar los mismos)
router.put("/addLike", addLike)
router.put("/addDislike", addDislike)
router.put("/quitLike", quitLike)
router.put("/quitDislike", quitDislike)

module.exports = router