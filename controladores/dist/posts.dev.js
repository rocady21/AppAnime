"use strict";

var _require = require("express"),
    request = _require.request,
    response = _require.response;

var Posts = require("../modelsBD/Posts.js");

var Usuario = require("../modelsBD/Usuario.js");

var Animes = require("../modelsBD/Animes.js");

var addNewPost = function addNewPost(req) {
  var res,
      id_user_publicate,
      User,
      post,
      _args = arguments;
  return regeneratorRuntime.async(function addNewPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          id_user_publicate = req.body.id_user_publicate;
          _context.next = 4;
          return regeneratorRuntime.awrap(Usuario.findOne({
            _id: id_user_publicate
          }));

        case 4:
          User = _context.sent;
          _context.prev = 5;

          if (!User) {
            _context.next = 11;
            break;
          }

          post = new Posts(req.body);
          _context.next = 10;
          return regeneratorRuntime.awrap(post.save());

        case 10:
          res.status(200).json({
            ok: true,
            post: post
          });

        case 11:
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);
          res.status(400).json({
            ok: false,
            msg: "Por favor hable con el administrador, hubo un error al añadir el usuario "
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 13]]);
};

var FilterPostByUser = function FilterPostByUser(req) {
  var res,
      id_user,
      user,
      userPost,
      _args2 = arguments;
  return regeneratorRuntime.async(function FilterPostByUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
          id_user = req.body.id_user;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Usuario.findOne({
            _id: id_user
          }));

        case 4:
          user = _context2.sent;
          _context2.prev = 5;

          if (!user) {
            _context2.next = 11;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(Posts.find({
            id_user_publicate: id_user
          }));

        case 9:
          userPost = _context2.sent;

          if (userPost[0]) {
            res.status(200).json({
              ok: true,
              userPost: userPost
            });
          } else res.status(200).json({
            ok: false,
            msg: "este usuario no tiene ningun post"
          });

        case 11:
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](5);
          console.log(_context2.t0);
          res.status(400).json({
            ok: false,
            msg: "Hubo un error al filtrar los post de este usuario, por favor hable con el administrador"
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 13]]);
};

var ActualizarPost = function ActualizarPost(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
};

var BorrarPost = function BorrarPost(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
};

module.exports = {
  addNewPost: addNewPost,
  FilterPostByUser: FilterPostByUser,
  ActualizarPost: ActualizarPost,
  BorrarPost: BorrarPost
};