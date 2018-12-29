const chatRoom = require('./chat-room/chat-room.service.js');
const user = require('./user/user.service.js');
const message = require('./message/message.service.js');
const userChatRoom = require('./user_chat_room/user_chat_room.service.js');
const contact = require('./contact/contact.service.js');
const userDetails = require('./user-details/user-details.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(chatRoom);
  app.configure(user);
  app.configure(message);
  app.configure(userChatRoom);
  app.configure(contact);
  app.configure(userDetails);
};
