const createService = require('./user-details.class.js');
const hooks = require('./user-details.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate,
    users: app.service('user'),
    contacts: app.service('contacts'),
    userChatRooms: app.service('user-chat-room'),
    chatRooms: app.service('chat-rooms')
  };

  app.use('/user-details', createService(options));

  const service = app.service('user-details');

  service.hooks(hooks);
};
