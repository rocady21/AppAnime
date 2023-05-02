const { Schema, model } = require("mongoose")

const PostSchema = Schema({
    descripcion: {
        type: String,
        require: true
    },
    foto: {
        type: String
    },
    id_user_publicate: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        require: true
    },
    Ubicacion: {
        type: String
    },
    Tipo: {
        type: String,
        require: true
    },
    MeGusta: {
        type: Number
    },
    Comentarios: [
        {
            id_User: {
                type: Schema.Types.ObjectId,
                ref: "Usuario",
                require: true
            },
            photo: {
                type: String
            },
            comentario: {
                type: String
            },
            valoracion: {
                type: Number
            },
            Fecha: {
                type: String
            },
            MeGusta: {
                type: Number
            },
        }
    ],
    FechaPublicacion: {
        type: String,
    }
})

module.exports = model("Posts", PostSchema)