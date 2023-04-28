const {request,response} =  require("express")
const Posts = require("../modelsBD/Posts.js")
const Usuario = require("../modelsBD/Usuario.js")
const Animes = require("../modelsBD/Animes.js")


const addNewPost = async(req,res = response)=> {
    const {id_user_publicate} = req.body

    const User = await Usuario.findOne({_id:id_user_publicate})

    try {
        if(User){
            const post = new Posts(req.body)
            
            await post.save()

            res.status(200).json({
                ok:true,
                post
            })
        } 
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:"Por favor hable con el administrador, hubo un error al añadir el usuario "
        })
    }

}


const FilterPostByUser = async(req,res = response)=> {
    const {id_user} = req.body

    const user = await Usuario.findOne({_id:id_user})
    try {
        if(user) {
            const userPost = await Posts.find({id_user_publicate:id_user})
            if(userPost[0])  {
                res.status(200).json({
                    ok:true,
                    userPost
                })
            } else 
            res.status(200).json({
                ok:false,
                msg:"este usuario no tiene ningun post"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:"Hubo un error al filtrar los post de este usuario, por favor hable con el administrador"
        })
    }

}
const ActualizarPost = (req,res = response)=> {

}
const BorrarPost = (req,res = response)=> {

}



module.exports = {
    addNewPost,
    FilterPostByUser,
    ActualizarPost,
    BorrarPost
} 