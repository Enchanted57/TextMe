const createService = require('feathers-sequelize');
const createModel = require('../../models/contact.model');
const hooks = require('./contact.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    raw: false
  };

  app.use('/contacts', createService(options));

  const service = app.service('contacts');

  service.hooks(hooks);
};
