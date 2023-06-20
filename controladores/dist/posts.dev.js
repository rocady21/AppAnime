"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var _require = require("express"),
    request = _require.request,
    response = _require.response;

var Posts = require("../modelsBD/Posts.js");

var Usuario = require("../modelsBD/Usuario.js");

var Animes = require("../modelsBD/Animes.js");

var _require2 = require("../helpers/pusherEvent.js"),
    LikesTotales = _require2.LikesTotales,
    DislikesTotales = _require2.DislikesTotales;

var addNewPost = function addNewPost(req) {
  var res,
      Id_user_publicate,
      User,
      post,
      _args = arguments;
  return regeneratorRuntime.async(function addNewPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          Id_user_publicate = req.body.Id_user_publicate;
          _context.next = 4;
          return regeneratorRuntime.awrap(Usuario.findOne({
            _id: Id_user_publicate
          }));

        case 4:
          User = _context.sent;
          _context.prev = 5;

          if (!User) {
            _context.next = 13;
            break;
          }

          console.log("xd");
          post = new Posts(req.body);
          _context.next = 11;
          return regeneratorRuntime.awrap(post.save());

        case 11:
          res.status(200).json({
            ok: true,
            post: post
          });
          console.log(post);

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);
          res.status(400).json({
            ok: false,
            msg: "Por favor hable con el administrador, hubo un error al añadir el usuario "
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 15]]);
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
            Id_user_publicate: id_user
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
  var res,
      _req$body,
      id_Post,
      CamposaActualizar,
      animeActualizado,
      _args3 = arguments;

  return regeneratorRuntime.async(function ActualizarPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
          _req$body = req.body, id_Post = _req$body.id_Post, CamposaActualizar = _req$body.CamposaActualizar;
          _context3.prev = 2;

          if (!CamposaActualizar) {
            _context3.next = 10;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_Post
          }, {
            $set: CamposaActualizar
          }));

        case 6:
          animeActualizado = _context3.sent;
          res.status(200).json({
            ok: true,
            msg: "Post Actualizado",
            animeActualizado: animeActualizado
          });
          _context3.next = 11;
          break;

        case 10:
          throw Error("Debe de ingresar nuevos valores para actualizar el post");

        case 11:
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          res.status(400).json({
            ok: false,
            msg: "Hubo un error al actualizar el post"
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

var BorrarPost = function BorrarPost(req) {
  var res,
      id_post,
      PostBorrado,
      _args4 = arguments;
  return regeneratorRuntime.async(function BorrarPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : response;
          id_post = req.body.id_post;
          console.log(req.body);
          _context4.prev = 3;

          if (!id_post) {
            _context4.next = 9;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(Posts.deleteOne({
            _id: id_post
          }));

        case 7:
          PostBorrado = _context4.sent;

          if (PostBorrado) {
            res.status(200).json({
              ok: true,
              msg: "Post Borrado Exitosamente"
            });
          }

        case 9:
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](3);
          console.log(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 11]]);
};

var filterPostById = function filterPostById(req) {
  var res,
      id_post,
      post,
      _args5 = arguments;
  return regeneratorRuntime.async(function filterPostById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : response;
          id_post = req.body.id_post;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 5:
          post = _context5.sent;

          if (!post) {
            _context5.next = 10;
            break;
          }

          res.status(200).json({
            ok: true,
            post: post
          });
          _context5.next = 11;
          break;

        case 10:
          throw Error("No se encontro el post");

        case 11:
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 13]]);
}; //interacciones


var addLike = function addLike(req) {
  var res,
      data,
      id_post,
      id_user,
      post,
      likeExist,
      dataInsert,
      likesTotales,
      _args6 = arguments;
  return regeneratorRuntime.async(function addLike$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : response;
          data = req.body.data;
          id_post = data.id_post, id_user = data.id_user; // evaluamos si existe el post. SOlo si el post existe podremos dar un like

          _context6.next = 5;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 5:
          post = _context6.sent;
          _context6.prev = 6;

          if (!post) {
            _context6.next = 21;
            break;
          }

          likeExist = false;
          post.MeGusta.map(function (infoPost) {
            if (infoPost.id_user == id_user) {
              return likeExist = true;
            }
          }); // si el like existe:

          if (!(likeExist == false)) {
            _context6.next = 19;
            break;
          }

          dataInsert = {
            id_user: id_user
          };
          _context6.next = 14;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_post
          }, {
            $push: {
              MeGusta: dataInsert
            }
          }));

        case 14:
          likesTotales = post.MeGusta.length + 1;
          LikesTotales(likesTotales);
          res.status(200).json({
            ok: true,
            msg: "Like agregado existosamente.",
            status: "Liked",
            likesTotales: likesTotales
          });
          _context6.next = 21;
          break;

        case 19:
          console.log("xd");
          res.status(200).json({
            ok: false,
            msg: "Ya diste like a esta publicacion"
          });

        case 21:
          _context6.next = 26;
          break;

        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](6);
          console.log(_context6.t0);

        case 26:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 23]]);
};

var quitLike = function quitLike(req) {
  var res,
      data,
      id_post,
      id_user,
      post,
      likeExist,
      dataDelete,
      updated,
      likesTotales,
      _args7 = arguments;
  return regeneratorRuntime.async(function quitLike$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : response;
          data = req.body.data;
          id_post = data.id_post, id_user = data.id_user;
          console.log(data);
          _context7.next = 6;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 6:
          post = _context7.sent;
          _context7.prev = 7;

          if (!post) {
            _context7.next = 20;
            break;
          }

          likeExist = false;
          post.MeGusta.map(function (infoPost) {
            if (infoPost.id_user == id_user) {
              return likeExist = true;
            }
          }); // si el like existe:

          if (!(likeExist == true)) {
            _context7.next = 19;
            break;
          }

          dataDelete = {
            id_user: id_user
          };
          _context7.next = 15;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_post
          }, {
            $pull: {
              MeGusta: dataDelete
            }
          }));

        case 15:
          updated = _context7.sent;

          if (updated) {
            likesTotales = post.MeGusta.length - 1;
            LikesTotales(likesTotales);
            res.status(200).json({
              ok: true,
              msg: "Like quitado existosamente.",
              status: "NoLiked",
              likesTotales: likesTotales
            });
          }

          _context7.next = 20;
          break;

        case 19:
          res.status(200).json({
            ok: false,
            msg: "Aun no has daado like"
          });

        case 20:
          _context7.next = 25;
          break;

        case 22:
          _context7.prev = 22;
          _context7.t0 = _context7["catch"](7);
          console.log(_context7.t0);

        case 25:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[7, 22]]);
};

var addDislike = function addDislike(req) {
  var res,
      data,
      id_post,
      id_user,
      post,
      _DislikeExist,
      dataInsert,
      disLikesTotales,
      _args8 = arguments;

  return regeneratorRuntime.async(function addDislike$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : response;
          data = req.body.data;
          id_post = data.id_post, id_user = data.id_user;
          _context8.next = 5;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 5:
          post = _context8.sent;
          _context8.prev = 6;

          if (!post) {
            _context8.next = 20;
            break;
          }

          _DislikeExist = false;
          post.NoMeGusta.map(function (infoPost) {
            if (infoPost.id_user == id_user) {
              return _DislikeExist = true;
            }
          }); // si el like existe:

          if (!(_DislikeExist === false)) {
            _context8.next = 19;
            break;
          }

          dataInsert = {
            id_user: id_user
          };
          _context8.next = 14;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_post
          }, {
            $push: {
              NoMeGusta: dataInsert
            }
          }));

        case 14:
          disLikesTotales = post.NoMeGusta.length + 1;
          DislikesTotales(disLikesTotales);
          res.status(200).json({
            ok: true,
            msg: "Disliked agregado existosamente.",
            status: "Disliked"
          });
          _context8.next = 20;
          break;

        case 19:
          res.status(200).json({
            ok: false,
            msg: "Ya diste Dislike a esta publicacion"
          });

        case 20:
          _context8.next = 25;
          break;

        case 22:
          _context8.prev = 22;
          _context8.t0 = _context8["catch"](6);
          console.log(_context8.t0);

        case 25:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[6, 22]]);
};

var quitDislike = function quitDislike(req) {
  var res,
      data,
      id_post,
      id_user,
      post,
      _DislikeExist2,
      dataDelete,
      updated,
      disLikesTotales,
      _args9 = arguments;

  return regeneratorRuntime.async(function quitDislike$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : response;
          data = req.body.data;
          id_post = data.id_post, id_user = data.id_user;
          _context9.next = 5;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 5:
          post = _context9.sent;
          _context9.prev = 6;

          if (!post) {
            _context9.next = 19;
            break;
          }

          _DislikeExist2 = false;
          post.NoMeGusta.map(function (infoPost) {
            if (infoPost.id_user == id_user) {
              return _DislikeExist2 = true;
            }
          }); // si el like existe:

          if (!(_DislikeExist2 === true)) {
            _context9.next = 18;
            break;
          }

          dataDelete = {
            id_user: id_user
          };
          _context9.next = 14;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_post
          }, {
            $pull: {
              NoMeGusta: dataDelete
            }
          }));

        case 14:
          updated = _context9.sent;

          if (updated) {
            disLikesTotales = post.NoMeGusta.length - 1;
            DislikesTotales(disLikesTotales);
            res.status(200).json({
              ok: true,
              msg: "Dislike quitado existosamente.",
              status: "NoDisliked",
              disLikesTotales: disLikesTotales
            });
          }

          _context9.next = 19;
          break;

        case 18:
          res.status(200).json({
            ok: false,
            msg: "No puedes quitar el Dislike si nuncalo lo has dado"
          });

        case 19:
          _context9.next = 24;
          break;

        case 21:
          _context9.prev = 21;
          _context9.t0 = _context9["catch"](6);
          console.log(_context9.t0);

        case 24:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[6, 21]]);
};

var LikeExist = function LikeExist(req) {
  var res,
      _req$body2,
      id_post,
      id_user,
      post,
      likeExist,
      _args10 = arguments;

  return regeneratorRuntime.async(function LikeExist$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : response;
          _req$body2 = req.body, id_post = _req$body2.id_post, id_user = _req$body2.id_user;
          _context10.next = 4;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 4:
          post = _context10.sent;
          _context10.prev = 5;

          if (!post) {
            _context10.next = 11;
            break;
          }

          likeExist = false;
          _context10.next = 10;
          return regeneratorRuntime.awrap(post.MeGusta.map(function (like) {
            if (like.id_user == id_user) {
              return likeExist = true;
            }
          }));

        case 10:
          if (likeExist == true) {
            res.status(200).json({
              ok: true,
              status: "Liked"
            });
          } else {
            res.status(200).json({
              ok: true,
              status: "NoLiked"
            });
          }

        case 11:
          _context10.next = 15;
          break;

        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](5);

        case 15:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[5, 13]]);
};

var DislikeExist = function DislikeExist(req) {
  var res,
      _req$body3,
      id_post,
      id_user,
      post,
      _DislikeExist3,
      _args11 = arguments;

  return regeneratorRuntime.async(function DislikeExist$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          res = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : response;
          _req$body3 = req.body, id_post = _req$body3.id_post, id_user = _req$body3.id_user;
          _context11.next = 4;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 4:
          post = _context11.sent;
          _context11.prev = 5;

          if (!post) {
            _context11.next = 11;
            break;
          }

          _DislikeExist3 = false;
          _context11.next = 10;
          return regeneratorRuntime.awrap(post.NoMeGusta.map(function (like) {
            if (like.id_user == id_user) {
              return _DislikeExist3 = (_readOnlyError("DislikeExist"), true);
            }
          }));

        case 10:
          if (_DislikeExist3 == true) {
            res.status(200).json({
              ok: true,
              status: "Disliked"
            });
          } else {
            res.status(200).json({
              ok: true,
              status: "NoDisliked"
            });
          }

        case 11:
          _context11.next = 16;
          break;

        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](5);
          console.log(_context11.t0);

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[5, 13]]);
}; // comentarios


var addComentario = function addComentario(req) {
  var res,
      _req$body4,
      id_post,
      data,
      post,
      _args12 = arguments;

  return regeneratorRuntime.async(function addComentario$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          res = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : response;
          _req$body4 = req.body, id_post = _req$body4.id_post, data = _req$body4.data;
          _context12.next = 4;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 4:
          post = _context12.sent;
          _context12.prev = 5;

          if (!post) {
            _context12.next = 11;
            break;
          }

          console.log(data);
          _context12.next = 10;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_post
          }, {
            $push: {
              Comentarios: data
            }
          }));

        case 10:
          res.status(200).json({
            ok: true,
            msg: "Comentario añadido correctamente"
          });

        case 11:
          _context12.next = 16;
          break;

        case 13:
          _context12.prev = 13;
          _context12.t0 = _context12["catch"](5);
          console.log(_context12.t0);

        case 16:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[5, 13]]);
};

var deleteComentario = function deleteComentario(req) {
  var res,
      _req$body5,
      id_post,
      id_comentario,
      post,
      _args13 = arguments;

  return regeneratorRuntime.async(function deleteComentario$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          res = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : response;
          _req$body5 = req.body, id_post = _req$body5.id_post, id_comentario = _req$body5.id_comentario;
          _context13.next = 4;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 4:
          post = _context13.sent;
          _context13.prev = 5;

          if (!post) {
            _context13.next = 9;
            break;
          }

          _context13.next = 9;
          return regeneratorRuntime.awrap(Posts.updateOne({
            _id: id_post
          }, {
            pull: {
              Comentarios: id_user
            }
          }));

        case 9:
          _context13.next = 14;
          break;

        case 11:
          _context13.prev = 11;
          _context13.t0 = _context13["catch"](5);
          console.log(_context13.t0);

        case 14:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[5, 11]]);
};

var editComentario = function editComentario(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var _req$body6 = req.body,
      id_post = _req$body6.id_post,
      id_comentario = _req$body6.id_comentario;
};

var getCommentByPost = function getCommentByPost(req) {
  var res,
      id_post,
      post,
      _args14 = arguments;
  return regeneratorRuntime.async(function getCommentByPost$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          res = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : response;
          id_post = req.body.id_post;
          _context14.prev = 2;
          _context14.next = 5;
          return regeneratorRuntime.awrap(Posts.findOne({
            _id: id_post
          }));

        case 5:
          post = _context14.sent;

          if (post.Comentarios[0]) {
            console.log("hay comentarios");
            res.status(200).json({
              ok: true,
              Comentarios: post.Comentarios
            });
          } else {
            console.log("no hay comentarios");
            res.status(200).json({
              ok: false,
              msg: "No hay Comentarios"
            });
          }

          _context14.next = 11;
          break;

        case 9:
          _context14.prev = 9;
          _context14.t0 = _context14["catch"](2);

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

module.exports = {
  addNewPost: addNewPost,
  FilterPostByUser: FilterPostByUser,
  ActualizarPost: ActualizarPost,
  BorrarPost: BorrarPost,
  filterPostById: filterPostById,
  addLike: addLike,
  quitLike: quitLike,
  addDislike: addDislike,
  quitDislike: quitDislike,
  addComentario: addComentario,
  deleteComentario: deleteComentario,
  editComentario: editComentario,
  LikeExist: LikeExist,
  DislikeExist: DislikeExist,
  getCommentByPost: getCommentByPost
};