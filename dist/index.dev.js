"use strict";

var express = require("express");

var dotenv = require("dotenv").config();

var _require = require("./configDB.js"),
    dbConection = _require.dbConection;

var app = express();

var ServidorSocket = require("http").Server(app);

var io = require("socket.io")(ServidorSocket);

var cors = require("cors"); //uso de socket.io


io.on("connection", function (socket) {
  console.log("usuario conectado");
  socket.emit("hello", "world");
});
console.log(io.path()); // conexion bd

dbConection(); //decirle a mi servidor que puede usar cualquier dominio

app.use(cors()); // lo que le digo es que las peticiones que haga en formato json las extraigo 

app.use(express.json());
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/user", require("./routes/user.js"));
app.use("/api/anime", require("./routes/anime.js"));
app.use("/api/posts", require("./routes/post.js"));
app.use("/api/chat", require("./routes/Chat.js"));
var PUERTO = process.env.PUERTO;
app.listen(PUERTO, function () {
  console.log("el servidor esta escuchando en el puerto ".concat(PUERTO));
});
module.exports = {
  app: app
};