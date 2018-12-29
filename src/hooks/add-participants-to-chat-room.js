const errors = require('@feathersjs/errors');

module.exports = async function(context) {
  const chatRoomId = context.id;

  let ids = await context.app.service('user-chat-room').find({
    query: {
      chatRoomId: chatRoomId
    }
  });

  ids = ids.data.map(x => x.dataValues.userId);

  const users = [];
  ids.forEach(id => {
    users.push(
      context.app.service('user').get(id)
    );  
  });

  await Promise.all(users)
    .then(values => {
      for (value of values) {
        delete value.dataValues.password;
      }
      context.result.dataValues.participants = values;
    })
    .catch(err => {
      throw new Error(err.toString());
    });

    return context;    
}