
const { Router } = require("express")
const { check } = require("express-validator")
const { validarCampos } = require("../middlware/validarCampos.js")
const { CrearUsuario, LoginUsuario, RevalidarJWT, ListadoUsuarios, getInfoByToken, getListFriends, AddNewFriend } = require("../controladores/auth.js")
const { ValidarJWT } = require("../helpers/revalidarJWT.js")
const router = Router();

// a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password


router.post("/new", CrearUsuario)

router.post("/login",
    [
        //Middlewares
        check("email", "debe de ingresar un email ").isEmail(),
        check("password", "debe de ingresar un password mayor a 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ]
    , LoginUsuario)

router.get("/validarUserInfoByToken", ValidarJWT, getInfoByToken)

router.get("/revalidarJWT", ValidarJWT, RevalidarJWT)

router.get("/listU", ListadoUsuarios)

router.post("/litFriends", getListFriends)

router.put("/newFriend", AddNewFriend)



module.exports = router;