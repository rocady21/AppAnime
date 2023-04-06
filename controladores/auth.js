const {request,response} = require("express");
const Usuario = require("../modelsBD/Usuario.js")
const {generarJWT} = require("../middlware/generarJWT.js")
// libreria para encriptar contraseña 
const bcrypt = require("bcrypt")




const CrearUsuario = async(req = request,res = response) => {
    
        const {name,email,password,rol} = req.body
        
    try {

        let usuario = await Usuario.findOne({email:email})

        if(usuario) {
            res.status(400).json({
                ok:false,
                msg:"ya hay un usuario con ese correo"
            })
        }
        // instanciar el usuario al schema de la bd
        usuario = new Usuario(req.body)

        // encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt)
        // guardar usuario en base de datos
        await usuario.save()

        // generar JWT
        const token = await generarJWT(usuario.name, usuario._id);
        

         res.status(200).json({
         ok:true,
         message: "Usuario Creado",
         name: usuario.name,
         uid: usuario._id,
         rol: usuario.rol,
         token : token    
    })        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:"Por favor hable con el administrador"
        })
    }

}
const LoginUsuario = async(req,res = response)=> {

        const {email,password} = req.body
    try {
        // evaluar si el email existe con find
        const usuario = await Usuario.findOne({email:email})

        if(!usuario) {
            res.status(404).json({
                ok:false,
                msg: "no hay un usuario con ese correo"
            })
        }

        //evaluar si la contraseña es la misma y existe
        const validPassword = bcrypt.compareSync(password,usuario.password)

        if(!validPassword) {
            return res.status(404).json({
                ok:false,
                msg: "password incorrecto"
            })
        }

        

        // generar jwt 
        const token = await generarJWT(usuario.id,usuario.name)

        res.status(200).json({
            ok: true,
            msg: "Login correctoo",
            uid : usuario._id,
            name: usuario.name,
            rol: usuario.rol,
            token : token

        })



        //generar respuesta
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: "por favor hable con el administrador"
        })
        
    }
    
}
const RevalidarJWT = async(req,res = response)=> {
    
    const name = req.name
    const uid = req.uid


    const token = await generarJWT(name,uid);

    res.status(200).json({
        ok:true,
        token ,
        uid,
        name,

    })

}
const ListadoUsuarios = (req,res = response)=> {
    
    const usuarios = Usuario.find()
    try {
        if(usuarios) {
            res.status(200).json({
                ok:true,
                 usuarios
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: "por favor hable con el administrador xd"
        })
        
    }
}

const getInfoByToken = async (req,res = response)=> {
    
    const uid = req?.uid;

    console.log(uid)

    const userInfo = await Usuario.findOne({_id: uid});
    try {
        if(userInfo) {
            res.status(200).json({
                ok:true,
                userInfo: {
                    ...userInfo,
                    password: null,
                },
            })
        } else {
            throw new Error("Error al consultar el usuario")
        }
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: error?.message,
        })
        
    }
}






module.exports = {
    CrearUsuario,
    LoginUsuario,
    RevalidarJWT,
    ListadoUsuarios,
    getInfoByToken,
}