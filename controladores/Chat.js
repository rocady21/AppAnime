const { response, request } = require("express")
const Chat = require("../modelsBD/Chat")
const Usuario = require("../modelsBD/Usuario")


const newChat = async (req, res = response) => {
    // id del usuario que cree el chat o mande el primer mensaje
    //para cargar un nuevo mensaje tengo que recibir el mensaje y de quien a quien
    const { id_me, id_user, message } = req.body
    const chat = await Chat.findOne({ from: id_me }, { to: id_user }) || await Chat.findOne({ from: id_me }, { to: id_user })
    try {
        if (!chat) {
            const estructureChat = {
                initChatDate: new Date(),
                from: id_me,
                to: id_user,
                messages: [
                    {
                        message: message,
                        time: new Date(),
                        id_user: id_me
                    }
                ]
            }
            const finalChat = new Chat(estructureChat)

            await finalChat.save()



            res.status(200).json({
                ok: true,
                msg: "chat creado correctamente",
                finalChat
            })
        } else {
            res.status(400).json({
                ok: false,
                msg: "error al crear el chat, ya tienes un chat con esta persona"
            })
        }


    } catch (error) {
        return res.json({ ok: false, msg: "Contacte con el desarrollador" });
    }

}
const loadMessagesContact = async (req, res = response) => {
    // para cargar todos mis chats con personas necesito mi id
    const { id_me } = req.body
    const chats = await Chat.find({ $or: [{ from: id_me }, { to: id_me }] })
    try {
        if (chats) {
            console.log(chats)
            // ahora que tenemos todos nuestros chats,necesitamos cargar la info de los usuarios 
            const userstoChatId = []

            chats.map((chats) => {
                console.log(chats.from)
                console.log(id_me)
                console.log("talon")
                if (chats.from == id_me) {
                    userstoChatId.push(chats.to)
                } else {
                    userstoChatId.push(chats.from)
                }
            })
            if (userstoChatId) {
                const usersinfo = []
                await Promise.all(
                    userstoChatId.map(async (idUser) => {
                        const user = await Usuario.findOne({ _id: idUser })
                        const dataRequired = {
                            id: user.id,
                            name: user.name,
                            photo: user.photo,
                            status: user.status
                        }
                        return usersinfo.push(dataRequired)
                    })
                )
                if (usersinfo) {

                    res.status(200).json({
                        ok: true,
                        msg: "Estos son los usuarios con los que has tenido un chat",
                        usersinfo
                    })

                } else {
                    res.status(400).json({
                        ok: false,
                        msg: "Error, no hay informacion de usuario"
                    })
                }
            } else {
                res.status(200).json({
                    ok: false,
                    msg: "Aun no tienes mensajes :D"
                })
            }
        }

    } catch (error) {
        console.log(error)
    }

}
const addMessageChat = async (req, res = response) => {

    const { id_me, id_user, message } = req.body
    try {

        const datainsert = {
            message: message,
            time: new Date(),
            id_user: id_me
        }
        const chatUpdated = await Chat.updateOne(
            { $or: [{ from: id_me, to: id_user }, { to: id_me, from: id_user }] }
            , {
                $push: { messages: datainsert }
            })
        if (chatUpdated) {
            res.status(200).json({
                oK: true,
                msg: "Mensaje enviado correctamente ",
                chatUpdated,

            })
        }
    } catch (error) {
        console.log(error)
    }
}

const loadMessageMeToUser = async (req, res = response) => {
    const { id_me, id_user } = req.body
    const chat = await Chat.findOne({ $or: [{ from: id_me, to: id_user }, { to: id_me, from: id_user }] })
    try {
        if (chat) {
            const messages = chat.messages
            res.status(200).json({
                ok: true,
                messages
            })

        } else {
            console.log("no existe el chat")
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    newChat,
    addMessageChat,
    loadMessagesContact,
    loadMessageMeToUser

}