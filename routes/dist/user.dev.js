"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router();

var _require2 = require("../controladores/User.js"),
    ListadoUsuarios = _require2.ListadoUsuarios,
    getListFriends = _require2.getListFriends,
    userDissconect = _require2.userDissconect,
    loadinfoUserById = _require2.loadinfoUserById,
    deleteFriend = _require2.deleteFriend,
    AddNewFriend = _require2.AddNewFriend,
    getFriendRequest = _require2.getFriendRequest,
    listFriendOnline = _require2.listFriendOnline,
    aceptarAmigo = _require2.aceptarAmigo,
    rechazarAmigo = _require2.rechazarAmigo,
    addAnimeFav = _require2.addAnimeFav,
    listAnimeFav = _require2.listAnimeFav,
    getUserById = _require2.getUserById;

router.get("/listU", ListadoUsuarios);
router.post("/listFriends", getListFriends);
router.put("/newFriend", AddNewFriend);
router.post("/getFriendRequest", getFriendRequest);
router.put("/aceptarAmigo", aceptarAmigo);
router.put("/rechazarAmigo", rechazarAmigo);
router.post("/addAnimeFav", addAnimeFav);
router.post("/listAnimeFav", listAnimeFav);
router.post("/getUserById", getUserById);
router.post("/friendsOnline", listFriendOnline);
router.post("/userDissconect", userDissconect);
router.post("/loadinfoUserById", loadinfoUserById);
router["delete"]("/deleteFriend", deleteFriend);
module.exports = router;