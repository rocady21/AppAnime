const { request, response } = require("express")
const Posts = require("../modelsBD/Posts.js")
const Usuario = require("../modelsBD/Usuario.js")
const Animes = require("../modelsBD/Animes.js")
const { LikesTotales, DislikesTotales } = require("../helpers/pusherEvent.js")

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
    const { id_post } = req.body
    console.log(req.body)
    try {

        if (id_post) {
            const PostBorrado = await Posts.deleteOne({ _id: id_post })

            if (PostBorrado) {
                res.status(200).json({
                    ok: true,
                    msg: "Post Borrado Exitosamente",
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
        } else
            throw Error("No se encontro el post")

    } catch (error) {
        console.log(error)
    }
}


//interacciones
const addLike = async (req, res = response) => {
    const { data } = req.body
    const { id_post, id_user } = data
    // evaluamos si existe el post. SOlo si el post existe podremos dar un like
    const post = await Posts.findOne({ _id: id_post })
    try {
        // si el post existe evaluamos si ya dimos un like, solo podremos dar like en el caso de que no lo hayamos dado
        if (post) {
            let likeExist = false
            post.MeGusta.map((infoPost) => {
                if (infoPost.id_user == id_user) {
                    return likeExist = true
                }
            })
            // si el like existe:
            if (likeExist == false) {
                const dataInsert = {
                    id_user: id_user
                }
                await Posts.updateOne({
                    _id: id_post
                }, {
                    $push: { MeGusta: dataInsert }
                })

                const likesTotales = post.MeGusta.length + 1

                LikesTotales(likesTotales)

                res.status(200).json({
                    ok: true,
                    msg: "Like agregado existosamente.",
                    status: "Liked",
                    likesTotales
                })

            } else {
                console.log("xd")
                res.status(200).json({
                    ok: false,
                    msg: "Ya diste like a esta publicacion"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const quitLike = async (req, res = response) => {
    const { data } = req.body
    const { id_post, id_user } = data
    console.log(data)

    const post = await Posts.findOne({ _id: id_post })
    try {
        // si el post existe evaluamos si ya dimos un like, solo podremos dar like en el caso de que no lo hayamos dado
        if (post) {
            let likeExist = false
            post.MeGusta.map((infoPost) => {
                if (infoPost.id_user == id_user) {
                    return likeExist = true
                }
            })
            // si el like existe:
            if (likeExist == true) {
                const dataDelete = {
                    id_user: id_user
                }
                const updated = await Posts.updateOne({
                    _id: id_post
                }, {
                    $pull: { MeGusta: dataDelete }
                })

                if (updated) {
                    const likesTotales = post.MeGusta.length - 1
                    LikesTotales(likesTotales)

                    res.status(200).json({
                        ok: true,
                        msg: "Like quitado existosamente.",
                        status: "NoLiked",
                        likesTotales
                    })

                }


            } else {
                res.status(200).json({
                    ok: false,
                    msg: "Aun no has daado like"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }

}
const addDislike = async (req, res = response) => {
    const { data } = req.body
    const { id_post, id_user } = data

    const post = await Posts.findOne({ _id: id_post })
    try {
        // si el post existe evaluamos si ya dimos un like, solo podremos dar like en el caso de que no lo hayamos dado
        if (post) {
            let DislikeExist = false
            post.NoMeGusta.map((infoPost) => {
                if (infoPost.id_user == id_user) {
                    return DislikeExist = true
                }
            })
            // si el like existe:
            if (DislikeExist === false) {
                const dataInsert = {
                    id_user: id_user
                }
                await Posts.updateOne({
                    _id: id_post
                }, {
                    $push: { NoMeGusta: dataInsert }
                })

                const disLikesTotales = post.NoMeGusta.length + 1

                DislikesTotales(disLikesTotales)


                res.status(200).json({
                    ok: true,
                    msg: "Disliked agregado existosamente.",
                    status: "Disliked"
                })

            } else {
                res.status(200).json({
                    ok: false,
                    msg: "Ya diste Dislike a esta publicacion"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }

}
const quitDislike = async (req, res = response) => {
    const { data } = req.body
    const { id_post, id_user } = data

    const post = await Posts.findOne({ _id: id_post })
    try {
        // si el post existe evaluamos si ya dimos un like, solo podremos dar like en el caso de que no lo hayamos dado
        if (post) {
            let DislikeExist = false
            post.NoMeGusta.map((infoPost) => {
                if (infoPost.id_user == id_user) {
                    return DislikeExist = true
                }
            })
            // si el like existe:
            if (DislikeExist === true) {
                const dataDelete = {
                    id_user: id_user
                }
                const updated = await Posts.updateOne({
                    _id: id_post
                }, {
                    $pull: { NoMeGusta: dataDelete }
                })

                if (updated) {
                    const disLikesTotales = post.NoMeGusta.length - 1

                    DislikesTotales(disLikesTotales)

                    res.status(200).json({
                        ok: true,
                        msg: "Dislike quitado existosamente.",
                        status: "NoDisliked",
                        disLikesTotales
                    })
                }

            } else {
                res.status(200).json({
                    ok: false,
                    msg: "No puedes quitar el Dislike si nuncalo lo has dado"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }


}

const LikeExist = async (req, res = response) => {
    const { id_post, id_user } = req.body

    const post = await Posts.findOne({ _id: id_post })
    try {
        if (post) {
            let likeExist = false
            await post.MeGusta.map((like) => {
                if (like.id_user == id_user) {
                    return likeExist = true
                }
            })
            if (likeExist == true) {
                res.status(200).json({
                    ok: true,
                    status: "Liked"
                })
            } else {
                res.status(200).json({
                    ok: true,
                    status: "NoLiked"
                })
            }

        }
    } catch (error) {

    }

}

const DislikeExist = async (req, res = response) => {
    const { id_post, id_user } = req.body

    const post = await Posts.findOne({ _id: id_post })
    try {
        if (post) {
            const DislikeExist = false
            await post.NoMeGusta.map((like) => {
                if (like.id_user == id_user) {
                    return DislikeExist = true
                }
            })

            if (DislikeExist == true) {
                res.status(200).json({
                    ok: true,
                    status: "Disliked"
                })
            } else {
                res.status(200).json({
                    ok: true,
                    status: "NoDisliked"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }

}
// comentarios
const addComentario = async (req, res = response) => {
    const { id_post, data } = req.body
    const post = await Posts.findOne({ _id: id_post })
    try {
        if (post) {
            console.log(data)

            await Posts.updateOne(
                { _id: id_post },
                { $push: { Comentarios: data } }

            )
            res.status(200).json({
                ok: true,
                msg: "Comentario añadido correctamente"
            })
        }

    } catch (error) {
        console.log(error)
    }

}
const deleteComentario = async (req, res = response) => {
    const { id_post, id_comentario } = req.body

    const post = await Posts.findOne({ _id: id_post })
    try {
        if (post) {
            await Posts.updateOne(
                { _id: id_post },
                { pull: { Comentarios: id_user } },
            )
        }

    } catch (error) {
        console.log(error)
    }


}
const editComentario = (req, res = response) => {
    const { id_post, id_comentario } = req.body

}

const getCommentByPost = async (req, res = response) => {
    const { id_post } = req.body
    try {
        const post = await Posts.findOne({ _id: id_post })
        if (post.Comentarios[0]) {
            console.log("hay comentarios")
            res.status(200).json({
                ok: true,
                Comentarios: post.Comentarios
            })
        } else {
            console.log("no hay comentarios")
            res.status(200).json({
                ok: false,
                msg: "No hay Comentarios"
            })
        }
    } catch (error) {

    }
}






module.exports = {
    addNewPost,
    FilterPostByUser,
    ActualizarPost,
    BorrarPost,
    filterPostById,
    addLike,
    quitLike,
    addDislike,
    quitDislike,
    addComentario,
    deleteComentario,
    editComentario,
    LikeExist,
    DislikeExist,
    getCommentByPost
} 