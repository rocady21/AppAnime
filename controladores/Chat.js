const { response } = require("express")
const Chat = require("../modelsBD/Chat")


const newMessage = async (req, res = response) => {

    try {

        const { message, to, from } = req?.body;



        if (!message || !to) {
            throw new Error("Mensaje o remitente incorrectos")
        }

        const newMessage = new Chat({
            message,
            from: from,
            to: to,
        });
        const response = await newMessage.save()

        return res.json({
            ok: true,
            newMessage: {
                chats_id: response?.id,
                chats_message: response?.message,
                chats_time: response?.time,
                chats_from: response?.from,
                chats_to: response?.to,
                isMe: true,
            },
        })
    } catch (error) {
        return res.json({ ok: false, msg: "Contacte con el desarrollador" });
    }

}
const LoadMessages = (req, res = response) => {

}
const setmessage = (req, res = response) => {

}


module.exports = {
    newMessage,
    setmessage,
    LoadMessages

}