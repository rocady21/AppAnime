"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var PostSchema = Schema({
  descripcion: {
    type: String,
    require: true
  },
  foto: {
    type: String
  },
  id_user_publicate: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true
  },
  Ubicacion: {
    type: String
  },
  Tipo: {
    type: String,
    require: true
  },
  MeGusta: {
    type: Number
  },
  Comentarios: [{
    id_User: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      require: true
    },
    photo: {
      type: String
    },
    comentario: {
      type: String
    },
    valoracion: {
      type: Number
    },
    Fecha: {
      type: String
    }
  }],
  FechaPublicacion: {
    type: String
  }
});
module.exports = model("Posts", PostSchema);