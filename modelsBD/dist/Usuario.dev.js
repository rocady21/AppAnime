"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var UsuarioSchema = Schema({
  photo: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  rol: {
    type: String,
    require: true
  },
  listFriends: [{
    id_User: {
      type: Schema.Types.ObjectId,
      ref: "Usuario"
    },
    dateInitFriend: {
      type: String
    }
  }],
  AnimesFav: [{
    id_Anime: {
      type: Schema.Types.ObjectId,
      ref: "Anime"
    },
    fechaAgregado: {
      type: String,
      require: true
    },
    comentario: {
      type: String
    }
  }]
});
module.exports = model("Usuario", UsuarioSchema);