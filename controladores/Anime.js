const {
    response
} = require("express")
const Animes = require("../modelsBD/Animes")
const Usuario = require("../modelsBD/Usuario")


const CrearAnime = async (req, res = response) => {

    const anime = new Animes(req.body)

    await anime.save()

    res.json({
        ok: true,
        msg: "Anime Creado",
        nombre: anime.name
    })
}

const ListAnime = async (req, res = response) => {

    const animes = await Animes.find();

    if (!animes) {
        res.status(400).json({
            msg: "No hay animes que obtener"
        })
    }

    res.json({
        animes: animes
    })

}

const ListadoAnime = async (req, res = response) => {

    const {
        name
    } = req.body

    const animes = await Animes.find({
        name: name
    })
    if (!animes) {
        return res.status(400).json({
            ok: false,
            msg: "No hay anime con ese nombre"
        })
    }

    res.status(200).json({
        ok: true,
        animes
    })

}
const getAnimeById = async (req, res = response) => {

    const {
        uid
    } = req.body;
    console.log(uid)
    console.log("1")
    // devolver info del usuario en base al id
    try {
        const anime = await Animes.findOne({
            _id: uid
        })
        if (anime) {
            res.status(200).json({
                ok: true,
                anime: anime

            })
            console.log("2")
        } else {
            res.status(400).json({
                ok: false,
                msg: "No hay anime con ese id"
            })
            throw new Error("No hay anime con ese id")
        }

    } catch (error) {
        console.log(error)
    }

}


const setComentarios = async (req, res = response) => {
    const {
        camposaActualizar, idAnime, NumeroCap
    } = req.body
    console.log("aqui vemos los datos que llegan de comentarios ")
    console.log(camposaActualizar)
    console.log(camposaActualizar.comentario)

    const comentarioActualizado = await Animes.updateOne({
        _id: idAnime
    }, {
        $push: { "Capitulos.$[capElement].Comentarios": camposaActualizar }
    },
        { arrayFilters: [{ "capElement.Capitulo": { $eq: NumeroCap } }] },
    )

    try {
        if (!comentarioActualizado) {
            throw Error("No existe el comentario a actualizar")
        } else {
            res.status(200).json({
                ok: true,
                msg: "Comentario Actualizado",
                comentarioActualizado,
                camposaActualizar
            })
            console.log("comentario actualizado")


        }

    } catch (error) {
        console.log("no se pudo agregar el comentario")
        res.status(400).json({
            ok: false,
            msg: "no se pudo actualizar los comentarios"
        })

    }

}

const getComentariosbyCap = async (req, res = response) => {
    const { NumeroCap, idAnime } = req.body

    const animes = await Animes.findOne({ _id: idAnime })

    try {
        if (animes) {
            const filtradoComentariosByAnime = await animes.Capitulos.find((cap) => {
                return cap.Capitulo === NumeroCap
            })
            if (filtradoComentariosByAnime) {

                const comentarios = filtradoComentariosByAnime.Comentarios

                const comentariosFInal = [];

                await Promise.all(
                    comentarios.map(async (comentario) => {
                        const user = await Usuario.findOne({ _id: comentario.id_User })
                        comentario.photo = user.photo
                        comentariosFInal.push(comentario)

                        return comentario

                    })
                )

                if (comentarios) {
                    console.log("aqui veremos el comentario fianl ")
                    console.log(comentarios)
                    res.status(200).json({
                        ok: true,
                        comentariosFInal,
                    })
                }

            } else {
                throw Error("no existen capitulos con ese numero")

            }
        } else {
            throw Error("no existe el anime")
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: error
        })
    }

}



module.exports = {
    CrearAnime,
    ListAnime,
    ListadoAnime,
    getAnimeById,
    setComentarios,
    getComentariosbyCap
}