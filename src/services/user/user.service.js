const createService = require('feathers-sequelize');
const createModel = require('../../models/user.model');
const hooks = require('./user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  app.use('/user', createService(options));

  const service = app.service('user');

  service.hooks(hooks);
};
