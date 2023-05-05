const { request, response } = require("express");
const Usuario = require("../modelsBD/Usuario.js")
const Animes = require("../modelsBD/Animes.js")
const { generarJWT } = require("../middlware/generarJWT.js")
// libreria para encriptar contraseña 
const bcrypt = require("bcrypt");




const CrearUsuario = async (req = request, res = response) => {

    const { photo, name, email, password, rol } = req.body

    try {

        let usuario = await Usuario.findOne({ email: email })

        if (usuario) {
            res.status(400).json({
                ok: false,
                msg: "ya hay un usuario con ese correo"
            })
        }
        // instanciar el usuario al schema de la bd
        usuario = new Usuario(req.body)

        // encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)
        // guardar usuario en base de datos
        await usuario.save()

        // generar JWT
        const token = await generarJWT(usuario.name, usuario._id);

        console.log("HOLA")

        res.status(200).json({
            ok: true,
            message: "Usuario Creado",
            name: usuario.name,
            uid: usuario._id,
            rol: usuario.rol,
            photo: usuario.photo,
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }

}
const LoginUsuario = async (req, res = response) => {

    const { email, password } = req.body
    try {
        // evaluar si el email existe con find
        const usuario = await Usuario.findOne({ email: email })

        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: "no hay un usuario con ese correo"
            })
        }

        //evaluar si la contraseña es la misma y existe
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: "password incorrecto"
            })
        }



        // generar jwt 
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            msg: "Login correctoo",
            uid: usuario._id,
            name: usuario.name,
            rol: usuario.rol,
            photo: usuario.photo,
            token: token

        })



        //generar respuesta
    } catch (error) {
        console.log(error);


    }

}
const RevalidarJWT = async (req, res = response) => {

    const name = req.name
    const uid = req.uid


    const token = await generarJWT(name, uid);

    res.status(200).json({
        ok: true,
        token,
        uid,
        name,

    })

}
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

const getInfoByToken = async (req, res = response) => {

    const uid = req?.uid;

    console.log(uid)

    const userInfo = await Usuario.findOne({ _id: uid });
    try {
        if (userInfo) {
            res.status(200).json({
                ok: true,
                userInfo
            })
        } else {
            throw new Error("Error al consultar el usuario")
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error?.message,
        })

    }
}
const getListFriends = async (req, res = response) => {

    const { idUser } = req.body;

    const user = await Usuario.findOne({ _id: idUser })
    try {
        if (!user) {
            throw Error("no hay usuario con ese id ")
        } else {

            const listFriends = [];

            await Promise.all(
                user.listFriends.map(async (friend) => {
                    if (friend.status === "friend") {
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
    const { id_user, id_friend } = req.body


    try {
        if (id_user !== id_friend) {
            const CamposAInsertar = {
                id_User: id_user,
                dateInitFriend: new Date(),
                status: "pending"
            }
            const userActualizado = await Usuario.updateOne({
                _id: id_friend
            }, {
                $push: {
                    listFriends: CamposAInsertar
                }
            }
            )

            res.status(200).json({
                ok: true,
                msg: "solicitud de amistad enviada",
                userActualizado
            })
        } else {
            throw Error("No hau un uuario con eee id")
        }


    } catch (error) {
        console.log(error)
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
    const { id_user, id_friend } = req.body

    const user = await Usuario.findOne({ _id: id_user })
    const userFriend = await Usuario.findOne({ _id: id_friend })

    try {
        if (!user) {
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
        const FriendAdd = await Usuario.updateOne({
            _id: id_friend
        },
            {
                $set: {
                    listFriends: {
                        status: "accept"
                    }
                }
            })
        if (FriendAdd) {
            const CamposAInsertar = {
                id_User: id_friend,
                dateInitFriend: new Date(),
                status: "accept"
            }
            const userActualizado = await Usuario.updateOne({
                _id: id_user
            }, {
                $push: {
                    listFriends: CamposAInsertar
                }
            }
            )
        }
        res.status(200).json({
            ok: true,
            msg: "solicitud de amistad aceptada",
            FriendAdd
        })
    } catch (error) {
        console.log(error);
    }


}

const rechazarAmigo = async (req, res = response) => {
    const { id_user, id_friend } = req.body

    const user = await Usuario.findOne({ _id: id_user })
    const userFriend = await Usuario.findOne({ _id: id_friend })

    try {
        if (!user) {
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
        const FriendAdd = await Usuario.updateOne({
            _id: id_user
        },
            {
                $set: {
                    listFriends: {
                        status: "no-accept"
                    }
                }
            })
        res.status(200).json({
            ok: true,
            msg: "solicitud de amistad rechazada",
            FriendAdd
        })
    } catch (error) {
        console.log(error);
    }

}





module.exports = {
    CrearUsuario,
    LoginUsuario,
    RevalidarJWT,
    ListadoUsuarios,
    getInfoByToken,
    getListFriends,
    AddNewFriend,
    addAnimeFav,
    listAnimeFav,
    aceptarAmigo,
    rechazarAmigo,
    getFriendRequest
} 