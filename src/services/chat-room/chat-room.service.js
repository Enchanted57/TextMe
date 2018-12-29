const createService = require('feathers-sequelize');
const createModel = require('../../models/chat-room.model');
const hooks = require('./chat-room.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  app.use('/chat-rooms', createService(options));

  const service = app.service('chat-rooms');

  service.hooks(hooks);
};
