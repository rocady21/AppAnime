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

module.exports = {
  sendNotification: sendNotification
};