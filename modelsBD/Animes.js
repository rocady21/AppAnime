const {Schema,model} = require("mongoose")

const AnimeSchema = Schema({
    name:{
        type:String,
        require: true
    },
    Portada: {
        type:String,
        require: true
    },
    fechaEmision:{
        type:String,
        require: true,
    },
    FechaFinalizacion:{
        type:String,
    },
    Capitulos:[{
        nameCapitulo:{
            type:String,
            require:true
            
        },
        Capitulo: {
            type:Number
        },
        portadaCap: {
            type:String
        },
        Duracion:{
            type:Number
        }
    }],
    Generos: [{
        type:String
    }],
    sinopsis: {
        type:String,
        require:true
    }
    
})

module.exports = model("Anime",AnimeSchema)