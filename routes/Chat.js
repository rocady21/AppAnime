const { newMessage, setmessage, LoadMessages } = require("../controladores/Chat.js")
const { Router } = require("express")
const router = Router();


// a la hora de crear usuario madnaremos el name, email y password y uid que se generara solo, y para login solo email y password


router.post("/newMessage", newMessage)

router.put("/setmessage", setmessage)

router.post("/LoadMessages", LoadMessages)



module.exports = router;