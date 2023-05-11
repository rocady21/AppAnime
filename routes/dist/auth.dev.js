"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("express-validator"),
    check = _require2.check;

var _require3 = require("../middlware/validarCampos.js"),
    validarCampos = _require3.validarCampos;

var _require4 = require("../controladores/auth.js"),
    CrearUsuario = _require4.CrearUsuario,
    LoginUsuario = _require4.LoginUsuario,
    RevalidarJWT = _require4.RevalidarJWT,
    ListadoUsuarios = _require4.ListadoUsuarios,
    getInfoByToken = _require4.getInfoByToken,
    getUserById = _require4.getUserById,
    getListFriends = _require4.getListFriends,
    AddNewFriend = _require4.AddNewFriend,
    addAnimeFav = _require4.addAnimeFav,
    listAnimeFav = _require4.listAnimeFav,
    getFriendRequest = _require4.getFriendRequest,
    aceptarAmigo = _require4.aceptarAmigo,
    rechazarAmigo = _require4.rechazarAmigo;

var _require5 = require("../helpers/revalidarJWT.js"),
    ValidarJWT = _require5.ValidarJWT;

var router = Router(); // a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password

router.post("/new", CrearUsuario);
router.post("/login", [//Middlewares
check("email", "debe de ingresar un email ").isEmail(), check("password", "debe de ingresar un password mayor a 6 caracteres").isLength({
  min: 6
}), validarCampos], LoginUsuario);
router.get("/validarUserInfoByToken", ValidarJWT, getInfoByToken);
router.get("/revalidarJWT", ValidarJWT, RevalidarJWT);
router.get("/listU", ListadoUsuarios);
router.post("/litFriends", getListFriends);
router.put("/newFriend", AddNewFriend);
router.post("/getFriendRequest", getFriendRequest);
router.put("/aceptarAmigo", aceptarAmigo);
router.put("/rechazarAmigo", rechazarAmigo);
router.post("/addAnimeFav", addAnimeFav);
router.post("/listAnimeFav", listAnimeFav);
router.post("/getUserById", getUserById);
module.exports = router;