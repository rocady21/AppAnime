const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1601416",
  key: "2e26f28031eb921a8ddd",
  secret: "3ea05c682d61dd7dc40f",
  cluster: "us2",
  useTLS: true
});

const sendNotification = (user,data)=> {
    pusher.trigger(`friendRequest-${user}`, "addNotification", {
        message: data
      });
}

// pusher para Interacciones(likes,dislikes y quitar los mismos)


module.exports = {
    sendNotification
}

  