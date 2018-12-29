const createService = require('feathers-sequelize');
const createModel = require('../../models/user_chat_room.model');
const hooks = require('./user_chat_room.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  app.use('/user-chat-room', createService(options));

  const service = app.service('user-chat-room');

  service.hooks(hooks);
};
