"use strict";

var _require = require("../controladores/Chat.js"),
    newChat = _require.newChat,
    addMessageChat = _require.addMessageChat,
    loadMessagesContact = _require.loadMessagesContact,
    loadMessageMeToUser = _require.loadMessageMeToUser;

var _require2 = require("express"),
    Router = _require2.Router;

var router = Router(); // a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password

router.post("/newChat", newChat);
router.put("/addMessageChat", addMessageChat);
router.post("/LoadMessages", loadMessagesContact);
router.post("/loadMessageMeToUser", loadMessageMeToUser); // borrar chat
// borrar mensaje
//actualizar mensajes

module.exports = router;