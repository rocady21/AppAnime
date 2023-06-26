const { response } = require("express");
const Usuario = require("../modelsBD/Usuario.js");
const Animes = require("../modelsBD/Animes.js");
const { userDissconection } = require("../helpers/pusherEvent.js");
const jwt = require("jsonwebtoken")


const ListadoUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find()
    try {
        if (usuarios) {
            res.status(200).json({
                ok: true,
                usuarios
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "por favor hable con el administrador xd"
        })

    }
}

const getUserById = async (req, res = response) => {
    const { id_user } = req.body

    try {
        const userExist = await Usuario.findOne({ _id: id_user })

        if (userExist) {
            res.status(200).json({
                ok: true,
                userInfo: {
                    _id: userExist._id,
                    name: userExist.name,
                    photo: userExist.photo,
                    AnimesFav: userExist.AnimesFav,
                    listFriends: userExist.listFriends
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

const getListFriends = async (req, res = response) => {

    const { id_user } = req.body;

    const user = await Usuario.findOne({ _id: id_user })
    try {
        if (!user) {
            throw Error("no hay usuario con ese id ")
        } else {

            const listFriends = [];

            await Promise.all(
                user.listFriends.map(async (friend) => {
                    if (friend.status === "accept") {
                        const infofriend = await Usuario.findOne({ _id: friend.id_User })
                        if (infofriend) {
                            listFriends.push({
                                _id: infofriend.id,
                                name: infofriend.name,
                                photo: infofriend.photo,
                                AnimesFav: infofriend.AnimesFav,
                                listFriends: infofriend.listFriends,
                                status: infofriend.status
                            })
                        }

                    }
                })

            )
            res.status(200).json({
                ok: true,
                listFriends
            })

        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: error
        })
    }

}
const getFriendRequest = async (req, res = response) => {

    const { idUser } = req.body;

    const user = await Usuario.findOne({ _id: idUser })
    try {

        const listFriends = [];

        await Promise.all(
            user.listFriends.map(async (friend) => {
                if (friend.status === "pending") {
                    const infofriend = await Usuario.findOne({ _id: friend.id_User })
                    if (infofriend) {
                        listFriends.push(infofriend)
                    }

                }
            })

        )
        res.status(200).json({
            ok: true,
            listFriends
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: error
        })
    }

}

const AddNewFriend = async (req, res = response) => {
    const { id_me, id_friend } = req.body


    const friend = await Usuario.findOne({ _id: id_friend })

    try {
        if (id_me !== id_friend) {
            const CamposAInsertar = {
                id_User: id_me,
                dateInitFriend: new Date(),
                status: "pending"
            }
            let ExistRequest = "";

            await Promise.all(
                friend.listFriends.map((friend) => {
                    if (id_me == friend.id_User) {
                        ExistRequest = "exist"
                    }
                })
            )
            if (ExistRequest === "") {
                const userActualizado = await Usuario.updateOne({
                    _id: id_friend
                }, {
                    $push: {
                        listFriends: CamposAInsertar
                    }
                }
                )

                sendNotification(id_friend, CamposAInsertar)

                return res.status(200).json({
                    ok: true,
                    msg: "solicitud de amistad enviada",
                })

            } else {
                console.log(ExistRequest)
                console.log("error")
                throw new Error("Ya has enviado una solicitud de amistad.")
            }


        } else {
            throw new Error("No hay un usuario con ese id")
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }


}

const addAnimeFav = async (req, res = response) => {
    const { id_user, Data } = req.body


    try {
        if (id_user) {
            const userUpdated = await Usuario.updateOne({
                _id: id_user
            }, {
                $push: {
                    AnimesFav: Data
                }
            })

            if (userUpdated) {
                res.status(200).json({
                    ok: true,
                    msg: "Anime agregado a Favoritos",
                    userUpdated
                })
            }

        } else
            res.status(400).json({
                ok: false,
                msg: "No hay un usuario con ese id"
            })

    } catch (error) {

    }
}

const listAnimeFav = async (req, res = response) => {
    const { id_User } = req.body

    const User = await Usuario.findOne({ _id: id_User })
    try {
        if (User) {
            const AnimesFav = User.AnimesFav
            const data = []

            await Promise.all(
                AnimesFav.map(async (animeFav) => {
                    const anime = await Animes.findOne({ _id: animeFav.id_Anime })
                    if (anime) {
                        data.push(anime)
                    }
                })
            )
            return res.status(200).json({
                ok: true,
                AnimesFav: data
            })
        } else
            throw Error("No hay ningun usuario con ese id")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }

}

const aceptarAmigo = async (req, res = response) => {
    const { id_me, id_friend } = req.body

    const me = await Usuario.findOne({ _id: id_me })
    const userFriend = await Usuario.findOne({ _id: id_friend })

    try {
        if (!me) {
            res.status(400).json({
                ok: false,
                msg: "el usuario no existe"
            })
        } if (!userFriend) {
            res.status(400).json({
                ok: false,
                msg: "el usuario friend no existe"
            })
        }

        const updatelistFriendMe = await Usuario.updateOne({
            _id: id_me
        },
            {
                $set: {
                    "listFriends.$[element].status": "accept"
                },

            },
            { arrayFilters: [{ "element.id_User": { $eq: id_friend } }] },)
        if (updatelistFriendMe) {
            const CamposAInsertarFriend = {
                id_User: id_me,
                dateInitFriend: new Date(),
                status: "accept"
            }
            const userActualizado = await Usuario.updateOne({
                _id: id_friend
            }, {
                $push: {
                    listFriends: CamposAInsertarFriend
                }
            }
            )
            res.status(200).json({
                ok: true,
                msg: "solicitud de amistad aceptada",
            })
        }
    } catch (error) {
        console.log(error);
    }


}

const rechazarAmigo = async (req, res = response) => {
    const { id_me, id_friend } = req.body

    const me = await Usuario.findOne({ _id: id_me })
    const userFriend = await Usuario.findOne({ _id: id_friend })

    try {
        if (!me) {
            res.status(400).json({
                ok: false,
                msg: "el usuario no existe"
            })
        } if (!userFriend) {
            res.status(400).json({
                ok: false,
                msg: "el usuario friend no existe"
            })
        }

        const newFriendsList = me?.listFriends?.filter((item) => {
            return item?.id_User?.toString() != id_friend;
        })

        console.log(newFriendsList);

        await Usuario.findOneAndUpdate(
            {
                _id: me?._id,
            },
            {
                listFriends: newFriendsList,
            }
        )


        res.status(200).json({
            ok: true,
            msg: "solicitud de amistad rechazada",
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Internal error",
        })
    }

}

const userDissconect = async (req, res = response) => {

    const { id_user } = req.body
    const me = await Usuario.find({ _id: id_user })

    try {

        if (id_user) {
            const userDissconect = await Usuario.updateOne({
                _id: id_user
            },
                {
                    $set: {
                        status: "Offline"
                    }
                }
            )


            userDissconection(id_user)

            if (userDissconect) {
                res.status(200).json({
                    ok: true,
                    msg: "Desconectado "
                })
            }

        }

    } catch (error) {
        console.log(error)
    }

}

const listFriendOnline = async (req, res = response) => {

    const { id_me } = req.body

    const me = await Usuario.findOne({ _id: id_me })

    try {
        if (me) {
            const data = []

            await Promise.all(
                me.listFriends.map(async (friend) => {
                    if (friend.status === "accept") {
                        console.log("Hola1")
                        const friendInfo = await Usuario.findOne({ _id: friend.id_User })
                        console.log(friendInfo)
                        if (friendInfo.status == "Online") {
                            console.log("hola2")
                            const dateNecesarie = {
                                _id: friendInfo._id,
                                name: friendInfo.name,
                                photo: friendInfo.photo
                            }
                            data.push(dateNecesarie);
                        }
                    }
                })
            )



            if (data[0]) {
                res.status(200).json({
                    ok: true,
                    usersOnline: data
                })

            } else {
                res.status(200).json({
                    ok: false,
                    msg: "No hay Amigos online"
                })
            }

        }


    } catch (error) {

    }


}

const loadinfoUserById = async (req, res = response) => {
    const { id_user } = req.body
    try {
        const user = await Usuario.findOne({ _id: id_user })
        if (user) {
            res.status(200).json({
                ok: true,
                user: user
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteFriend = async(req, res = response)=> {
    console.log("hola mundo")
    const token = req?.header("x-token");
    const {id_user} = req.body
    const { id: userId } = jwt.verify(token, process.env.PALABRA_SECRETA);
    if(id_user) {
        res.status(200).json({
            ok:true,
            id_User:userId,

        })
    }
}


module.exports = {
    ListadoUsuarios,
    getListFriends,
    AddNewFriend,
    addAnimeFav,
    listAnimeFav,
    aceptarAmigo,
    rechazarAmigo,
    getFriendRequest,
    getUserById,
    listFriendOnline,
    userDissconect,
    loadinfoUserById,
    deleteFriend

}