const jwt = require("jsonwebtoken")

const generarJWT = (uid,name)=> {
    return new Promise((resolve,reject)=> {

        const payload = {uid,name}
        // sign es para firmar el token, 
        // sign recibe 3 parametros, el payload que seria la info del usuario, palabra secreta para firmar mi token
        // la duracion y un callback para ver si se hizo correctamente o no 
        jwt.sign(payload,process.env.PALABRA_SECRETA,{
            expiresIn: "2h"
        },(err,token)=> {
            if(err) {
                console.log(err);
                reject("no se pudo generar el token")
            }
            resolve(token);
        })

    })
}

module.exports = {
    generarJWT
}