"use strict";

var express = require("express");

var dotenv = require("dotenv").config();

var _require = require("./configDB.js"),
    dbConection = _require.dbConection;

var app = express();

var cors = require("cors"); // conexion bd


dbConection(); // cors para dar permiso a rutas 

app.use(cors()); // lo que le digo es que las peticiones que haga en formato json las extraigo 

app.use(express.json());
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/anime", require("./routes/anime.js"));
app.use("/api/posts", require("./routes/post.js"));
var PUERTO = process.env.PUERTO;
app.listen(PUERTO, function () {
  console.log("el servidor esta escuchando en el puerto ".concat(PUERTO));
});