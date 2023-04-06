const {response} = require("express")
const jwt = require("jsonwebtoken")

const ValidarJWT = (req,res = response,next)=> {

    // x-token headers

    const token = req.header("x-token")

    if(!token ) {
        return res.status(401).json({
            ok:false,
            msg:"no hay token en la validacion"
        })
    }
    try {
        // con esto lo que hacemos es saber el usuario en base al token , pasando el token y la firma para que nos devuelva de quien es
        const payload = jwt.verify(
            token,
            process.env.PALABRA_SECRETA
        )
        const isExpired = Date.now() >= payload.exp * 1000;
        if (isExpired) {
            throw new Error("El token no es valido")
        }

        console.log(payload)
        req.name = payload.name
        req.uid = payload.uid
        next()
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: "token no valido"
        })
    }


    
}

module.exports = {

    ValidarJWT
}