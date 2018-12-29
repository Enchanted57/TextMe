const errors = require('@feathersjs/errors');

module.exports = async function(context) {
    
    if (context.data.userId == context.data.friendId) {
    
        return Promise.reject( 
            new errors.BadRequest('friendId and userId cannot contain the same value.')
        );
    }
    const friendId = context.data.friendId;

    try {
        const user = await context.app.service('user').get(friendId);

        return context;
      } catch (err) {
        return Promise.reject( 
            new errors.BadRequest('friendId does not exist in \'user\' entity.')
        );
    }
}