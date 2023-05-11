const { Schema, model } = require("mongoose")

const ChatSchema = Schema({
    message: {
        type: String
    },
    time: {
        type: Date
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"

    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    isMe: {
        type: Boolean
    }

})

module.exports = model("Chat", ChatSchema)