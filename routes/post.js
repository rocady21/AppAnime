const { Router } = require("express")
const { addNewPost, FilterPostByUser, ActualizarPost, BorrarPost, filterPostById } = require("../controladores/posts.js")
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
router.delete("/BorrarPost", BorrarPost)
router.post("/filterPostById", filterPostById)

module.exports = router