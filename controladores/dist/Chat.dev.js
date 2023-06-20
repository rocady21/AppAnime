"use strict";

var _require = require("express"),
    response = _require.response,
    request = _require.request;

var Chat = require("../modelsBD/Chat");

var Usuario = require("../modelsBD/Usuario");

var newChat = function newChat(req) {
  var res,
      _req$body,
      id_me,
      id_user,
      message,
      chat,
      estructureChat,
      finalChat,
      _args = arguments;

  return regeneratorRuntime.async(function newChat$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
          // id del usuario que cree el chat o mande el primer mensaje
          //para cargar un nuevo mensaje tengo que recibir el mensaje y de quien a quien
          _req$body = req.body, id_me = _req$body.id_me, id_user = _req$body.id_user, message = _req$body.message;
          _context.next = 4;
          return regeneratorRuntime.awrap(Chat.findOne({
            from: id_me
          }, {
            to: id_user
          }));

        case 4:
          _context.t0 = _context.sent;

          if (_context.t0) {
            _context.next = 9;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(Chat.findOne({
            from: id_me
          }, {
            to: id_user
          }));

        case 8:
          _context.t0 = _context.sent;

        case 9:
          chat = _context.t0;
          _context.prev = 10;

          if (chat) {
            _context.next = 19;
            break;
          }

          estructureChat = {
            initChatDate: new Date(),
            from: id_me,
            to: id_user,
            messages: [{
              message: message,
              time: new Date(),
              id_user: id_me
            }]
          };
          finalChat = new Chat(estructureChat);
          _context.next = 16;
          return regeneratorRuntime.awrap(finalChat.save());

        case 16:
          res.status(200).json({
            ok: true,
            msg: "chat creado correctamente",
            finalChat: finalChat
          });
          _context.next = 20;
          break;

        case 19:
          res.status(400).json({
            ok: false,
            msg: "error al crear el chat, ya tienes un chat con esta persona"
          });

        case 20:
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t1 = _context["catch"](10);
          return _context.abrupt("return", res.json({
            ok: false,
            msg: "Contacte con el desarrollador"
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 22]]);
};

var loadMessagesContact = function loadMessagesContact(req) {
  var res,
      id_me,
      chats,
      userstoChatId,
      usersinfo,
      _args3 = arguments;
  return regeneratorRuntime.async(function loadMessagesContact$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
          // para cargar todos mis chats con personas necesito mi id
          id_me = req.body.id_me;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Chat.find({
            $or: [{
              from: id_me
            }, {
              to: id_me
            }]
          }));

        case 4:
          chats = _context3.sent;
          _context3.prev = 5;

          if (!chats) {
            _context3.next = 18;
            break;
          }

          console.log(chats); // ahora que tenemos todos nuestros chats,necesitamos cargar la info de los usuarios 

          userstoChatId = [];
          chats.map(function (chats) {
            console.log(chats.from);
            console.log(id_me);
            console.log("talon");

            if (chats.from == id_me) {
              userstoChatId.push(chats.to);
            } else {
              userstoChatId.push(chats.from);
            }
          });

          if (!userstoChatId) {
            _context3.next = 17;
            break;
          }

          usersinfo = [];
          _context3.next = 14;
          return regeneratorRuntime.awrap(Promise.all(userstoChatId.map(function _callee(idUser) {
            var user, dataRequired;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(Usuario.findOne({
                      _id: idUser
                    }));

                  case 2:
                    user = _context2.sent;
                    dataRequired = {
                      id: user.id,
                      name: user.name,
                      photo: user.photo,
                      status: user.status
                    };
                    return _context2.abrupt("return", usersinfo.push(dataRequired));

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          })));

        case 14:
          if (usersinfo) {
            res.status(200).json({
              ok: true,
              msg: "Estos son los usuarios con los que has tenido un chat",
              usersinfo: usersinfo
            });
          } else {
            res.status(400).json({
              ok: false,
              msg: "Error, no hay informacion de usuario"
            });
          }

          _context3.next = 18;
          break;

        case 17:
          res.status(200).json({
            ok: false,
            msg: "Aun no tienes mensajes :D"
          });

        case 18:
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](5);
          console.log(_context3.t0);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 20]]);
};

var addMessageChat = function addMessageChat(req) {
  var res,
      _req$body2,
      id_me,
      id_user,
      message,
      datainsert,
      chatUpdated,
      _args4 = arguments;

  return regeneratorRuntime.async(function addMessageChat$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : response;
          _req$body2 = req.body, id_me = _req$body2.id_me, id_user = _req$body2.id_user, message = _req$body2.message;
          _context4.prev = 2;
          datainsert = {
            message: message,
            time: new Date(),
            id_user: id_me
          };
          _context4.next = 6;
          return regeneratorRuntime.awrap(Chat.updateOne({
            $or: [{
              from: id_me,
              to: id_user
            }, {
              to: id_me,
              from: id_user
            }]
          }, {
            $push: {
              messages: datainsert
            }
          }));

        case 6:
          chatUpdated = _context4.sent;

          if (chatUpdated) {
            res.status(200).json({
              oK: true,
              msg: "Mensaje enviado correctamente ",
              chatUpdated: chatUpdated
            });
          }

          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 10]]);
};

var loadMessageMeToUser = function loadMessageMeToUser(req) {
  var res,
      _req$body3,
      id_me,
      id_user,
      chat,
      messages,
      _args5 = arguments;

  return regeneratorRuntime.async(function loadMessageMeToUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : response;
          _req$body3 = req.body, id_me = _req$body3.id_me, id_user = _req$body3.id_user;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Chat.findOne({
            $or: [{
              from: id_me,
              to: id_user
            }, {
              to: id_me,
              from: id_user
            }]
          }));

        case 4:
          chat = _context5.sent;

          try {
            if (chat) {
              messages = chat.messages;
              res.status(200).json({
                ok: true,
                messages: messages
              });
            } else {
              console.log("no existe el chat");
            }
          } catch (error) {
            console.log(error);
          }

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  newChat: newChat,
  addMessageChat: addMessageChat,
  loadMessagesContact: loadMessagesContact,
  loadMessageMeToUser: loadMessageMeToUser
};