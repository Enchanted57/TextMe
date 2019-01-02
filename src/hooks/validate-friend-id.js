const errors = require('@feathersjs/errors');

module.exports = async function(context) {
    const friendId = context.data.friendId || context.params.query.friendId,
          userId   = context.data.userId || context.params.query.userId

    if (userId == friendId) {
        return Promise.reject( 
            new errors.BadRequest('friendId and userId cannot contain the same value.')
        );
    }

    try {
        const user = await context.app.service('user').get(friendId);

        return context;
      } catch (err) {
        return Promise.reject( 
            new errors.BadRequest('friendId does not exist in \'user\' entity.')
        );
    }
}