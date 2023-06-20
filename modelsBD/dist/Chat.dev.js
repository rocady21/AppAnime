"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var ChatSchema = Schema({
  initChatDate: {
    type: Date
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  messages: [{
    message: {
      type: String,
      require: true
    },
    time: {
      type: Date
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario"
    }
  }]
});
module.exports = model("Chat", ChatSchema);