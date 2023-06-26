"use strict";

var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "1601416",
  key: "2e26f28031eb921a8ddd",
  secret: "3ea05c682d61dd7dc40f",
  cluster: "us2",
  useTLS: true
});

var sendNotification = function sendNotification(user, data) {
  pusher.trigger("friendRequest-".concat(user), "addNotification", {
    message: data
  });
};

var userOnline = function userOnline(userID) {
  pusher.trigger("friendsOnline", "addFriendOnline", {
    message: userID
  });
};

var userDissconection = function userDissconection(userID) {
  pusher.trigger("userDissconect", "removeFriendOnline", {
    message: userID
  });
};

var LikesTotales = function LikesTotales(likes) {
  pusher.trigger("statusLike", "addorquitLike", {
    message: likes
  });
};

var DislikesTotales = function DislikesTotales(dislikes) {
  pusher.trigger("statusDislike", "addorquitDislike", {
    message: dislikes
  });
}; // const name = (message) => {
//   pusher.trigger("nameChannel","nameEvent",{
//    message:disLikes  
// })
// }


var messageRealTime = function messageRealTime(from, to, message) {
  pusher.trigger("messages-".concat(from, "and-").concat(to), "sendMessage", {
    message: message
  });
};

var isWriting = function isWriting() {
  pusher.trigger("isWriting", "writing", {
    message: false
  });
}; // pusher para Interacciones(likes,dislikes y quitar los mismos)


module.exports = {
  sendNotification: sendNotification,
  userOnline: userOnline,
  userDissconection: userDissconection,
  LikesTotales: LikesTotales,
  DislikesTotales: DislikesTotales,
  messageRealTime: messageRealTime
};