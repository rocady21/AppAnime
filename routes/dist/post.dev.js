"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("../controladores/posts.js"),
    addNewPost = _require2.addNewPost,
    FilterPostByUser = _require2.FilterPostByUser,
    ActualizarPost = _require2.ActualizarPost,
    BorrarPost = _require2.BorrarPost;

var _require3 = require("express-validator"),
    check = _require3.check;

var _require4 = require("../middlware/validarCampos.js"),
    validarCampos = _require4.validarCampos;

var _require5 = require("util"),
    isNumber = _require5.isNumber;

var _require6 = require("util/types"),
    isNumberObject = _require6.isNumberObject;

var router = Router();
router.post("/newPost", [//middlware
check("descripcion", "debe de ingresar una descripcion valida de minimo un caracter ").notEmpty(), check("tipo", "Debe de espesificar que tipo de publicacion es, no se admiten numeros ni que el campo sea vacio").isInt().notEmpty(), validarCampos], addNewPost);
router.post("/filterPost", FilterPostByUser);
router.put("actualizarPost", ActualizarPost);
router["delete"]("BorrarPost", BorrarPost);
module.exports = router;