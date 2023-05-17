"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var AnimeSchema = Schema({
  name: {
    type: String,
    require: true
  },
  Portada: {
    type: String,
    require: true
  },
  fechaEmision: {
    type: String,
    require: true
  },
  FechaFinalizacion: {
    type: String
  },
  Tipo: {
    type: String
  },
  Capitulos: [{
    nameCapitulo: {
      type: String,
      require: true
    },
    Capitulo: {
      type: Number
    },
    portadaCap: {
      type: String
    },
    Duracion: {
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
    }]
  }],
  Generos: [{
    type: String
  }],
  sinopsis: {
    type: String,
    require: true
  }
});
module.exports = model("Anime", AnimeSchema);