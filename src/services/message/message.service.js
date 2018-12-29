const createService = require('feathers-sequelize');
const createModel = require('../../models/message.model');
const hooks = require('./message.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  app.use('/messages', createService(options));

  const service = app.service('messages');

  service.hooks(hooks);
};
