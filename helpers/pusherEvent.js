const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1601416",
  key: "2e26f28031eb921a8ddd",
  secret: "3ea05c682d61dd7dc40f",
  cluster: "us2",
  useTLS: true
});

const sendNotification = (user, data) => {
  pusher.trigger(`friendRequest-${user}`, "addNotification", {
    message: data
  });
}

const userOnline = (userID) => {
  pusher.trigger(`friendsOnline`, "addFriendOnline", {
    message: userID
  });
}
const userDissconection = (userID) => {
  pusher.trigger(`userDissconect`, "removeFriendOnline", {
    message: userID
  });
}

const LikesTotales = (likes) => {
  pusher.trigger("statusLike", "addorquitLike", {
    message: likes
  })
}

const DislikesTotales = (dislikes) => {
  pusher.trigger("statusDislike", "addorquitDislike", {
    message: dislikes
  })
}


module.exports = {
  sendNotification,
  userOnline,
  userDissconection,
  LikesTotales,
  DislikesTotales
}

