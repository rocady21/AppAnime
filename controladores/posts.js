const { request, response } = require("express")
const Posts = require("../modelsBD/Posts.js")
const Usuario = require("../modelsBD/Usuario.js")
const Animes = require("../modelsBD/Animes.js")


const addNewPost = async (req, res = response) => {

    const { Id_user_publicate } = req.body

    const User = await Usuario.findOne({ _id: Id_user_publicate })

    try {
        if (User) {
            console.log("xd")
            const post = new Posts(req.body)

            await post.save()

            res.status(200).json({
                ok: true,
                post
            })
            console.log(post)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Por favor hable con el administrador, hubo un error al añadir el usuario "
        })
    }

}


const FilterPostByUser = async (req, res = response) => {
    const { id_user } = req.body

    const user = await Usuario.findOne({ _id: id_user })
    try {
        if (user) {
            const userPost = await Posts.find({ Id_user_publicate: id_user })
            if (userPost[0]) {
                res.status(200).json({
                    ok: true,
                    userPost
                })
            } else
                res.status(200).json({
                    ok: false,
                    msg: "este usuario no tiene ningun post"
                })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Hubo un error al filtrar los post de este usuario, por favor hable con el administrador"
        })
    }

}
const ActualizarPost = async (req, res = response) => {
    const { id_Post, CamposaActualizar } = req.body

    try {
        if (CamposaActualizar) {
            const animeActualizado = await Posts.updateOne({
                _id: id_Post
            }, {
                $set: CamposaActualizar
            }

            )

            res.status(200).json({
                ok: true,
                msg: "Post Actualizado",
                animeActualizado
            })

        } else
            throw Error("Debe de ingresar nuevos valores para actualizar el post")

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Hubo un error al actualizar el post"
        })
    }

}
const BorrarPost = async (req, res = response) => {
    const { id_Post } = req.body

    try {

        if (id_Post) {
            const PostBorrado = await Posts.deleteOne({ _id: id_Post })

            if (PostBorrado) {
                res.status(200).json({
                    ok: true,
                    msg: "Post Borrado Exitosamente",
                    PostBorrado
                })

            }
        }

    } catch (error) {
        console.log(error)
    }

}

const filterPostById = async (req, res = response) => {
    const { id_post } = req.body
    try {
        const post = await Posts.findOne({ _id: id_post })

        if (post) {
            res.status(200).json({
                ok: true,
                post
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const addLike = (req, res = response) => {
    const { id_post } = req.body
}
const quitLike = (req, res = response) => {
    const { id_post } = req.body

}
const addDisLike = (req, res = response) => {
    const { id_post } = req.body

}
const quitDisLike = (req, res = response) => {
    const { id_post } = req.body

}

const addComentario = (req, res = response) => {
    const { id_post, id_comentario } = req.body

}
const deleteComentario = (req, res = response) => {
    const { id_post, id_comentario } = req.body

}
const updateComentario = (req, res = response) => {
    const { id_post, id_comentario } = req.body

}




module.exports = {
    addNewPost,
    FilterPostByUser,
    ActualizarPost,
    BorrarPost,
    filterPostById
} 