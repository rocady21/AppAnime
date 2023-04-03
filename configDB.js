const mongoose = require("mongoose")

const dbConection = async()=> {
    try {

        await mongoose.connect(process.env.DB_CONECTION ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        } );

        console.log("DB ONLINE")
        
    } catch (error) {
        console.log(error)
        throw new Error("No se pudo conectar con la base de datos");
    }
}

module.exports = {
    dbConection
}