const { newChat, addMessageChat, loadMessagesContact, loadMessageMeToUser } = require("../controladores/Chat.js")
const { Router } = require("express")
const router = Router();


// a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password


router.post("/newChat", newChat)

router.put("/addMessageChat", addMessageChat)

router.post("/LoadMessages", loadMessagesContact)

router.post("/loadMessageMeToUser", loadMessageMeToUser)

// borrar chat

// borrar mensaje

//actualizar mensajes

module.exports = router;