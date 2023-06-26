const { Router } = require("express");
const router = Router()
const { ListadoUsuarios, getListFriends, userDissconect, loadinfoUserById,deleteFriend, AddNewFriend, getFriendRequest, listFriendOnline, aceptarAmigo, rechazarAmigo, addAnimeFav, listAnimeFav, getUserById } = require("../controladores/User.js")


router.get("/listU", ListadoUsuarios)

router.post("/listFriends", getListFriends)

router.put("/newFriend", AddNewFriend)

router.post("/getFriendRequest", getFriendRequest)

router.put("/aceptarAmigo", aceptarAmigo)

router.put("/rechazarAmigo", rechazarAmigo)

router.post("/addAnimeFav", addAnimeFav)

router.post("/listAnimeFav", listAnimeFav)

router.post("/getUserById", getUserById)

router.post("/friendsOnline", listFriendOnline)

router.post("/userDissconect", userDissconect)

router.post("/loadinfoUserById", loadinfoUserById)

router.delete("/deleteFriend",deleteFriend)


module.exports = router;