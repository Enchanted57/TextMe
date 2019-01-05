const errors = require('@feathersjs/errors');

module.exports = function (options = {}) {
  return async context => {

    return Promise.reject(
        new errors.NotImplemented('Service has not yet been implemented.')
    );
    
  };
};
