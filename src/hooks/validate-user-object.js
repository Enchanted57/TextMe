const errors = require('@feathersjs/errors');

module.exports = function (options = {}) {
  return async context => {
    const { password, name, email } = context.data;

    if (! (password && name && email) )
      throw new errors.BadRequest('Format of the request is not supported');

    if (!validateEmailAddress(email))
      throw new errors.BadRequest('Email value has a bad format.');

    if (!name)
      throw new errors.BadRequest(paramMustHaveValueMsg('Name'));

    if (!password)
      throw new errors.BadRequest(paramMustHaveValueMsg('Password'));

    context.data = {
      password,
      name,
      email
    }

    return context;
  };
};

function paramMustHaveValueMsg(paramName) {
  return `${paramName} must have a value.`
}

function validateEmailAddress(emailStr) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(emailStr).toLowerCase())
}