const express = require("express")
const dotenv = require("dotenv").config();
const { dbConection } = require("./configDB.js")
const app = express()
const cors = require("cors")
// conexion bd

dbConection();

// cors para dar permiso a rutas 
app.use(cors())

// lo que le digo es que las peticiones que haga en formato json las extraigo 
app.use(express.json())
app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/anime", require("./routes/anime.js"))
app.use("/api/posts", require("./routes/post.js"))




const PUERTO = process.env.PUERTO
app.listen(PUERTO, () => {
    console.log(`el servidor esta escuchando en el puerto ${PUERTO}`)
})