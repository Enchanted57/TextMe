const errors = require('@feathersjs/errors');
// validates whether friendId is actually in your contact list
module.exports = async function(context) {
    const friendId = context.params.query.friendId,
          userId   = context.params.query.userId

    try {
      const contact = await context.app.service('contacts').find({
        query: {
          userId: userId,
          friendId: friendId
        }
      });

      if (!contact.data.length) {
        throw new Error('friendId is not present at your contact list');
      }

    } catch(e) {
      
      return Promise.reject(
        new errors.BadRequest(e.toString())
      );
    }
    
    return context;
}