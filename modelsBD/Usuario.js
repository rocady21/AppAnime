const {Schema,model} = require("mongoose")

const UsuarioSchema = Schema({
    photo:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    rol: {
        type:String,
        require: true
    }
})

module.exports = model("Usuario",UsuarioSchema)