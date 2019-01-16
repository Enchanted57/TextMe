module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  const messagesService = app.service('messages');
  const contactsService = app.service('contacts');

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      const { user } = connection;

      app.channel(`userIds/${user.dataValues.id}`).join(connection);

      app.service('user-chat-room').find({
        paginate: false,
        query: {
          userId: user.dataValues.id,
        }
      }).then(res => {
        res.forEach(ucr => {
          app.channel(`room/${ucr.dataValues.chatRoomId}`).join(connection);
        });
      }).catch(err => {
        console.log(err);
      })
      
      app.channel('anonymous').leave(connection);

      app.channel('authenticated').join(connection);

    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {

    return app.channel('authenticated');
  });

  messagesService.publish('created', (data, hook) => {
    return app.channel(`room/${data.dataValues.chatRoomId}`);
  });

  contactsService.publish('created', (data, hook) => {
    return [
      app.channel(`userIds/${data.dataValues.userId}`),
      app.channel(`userIds/${data.dataValues.friendId}`)
    ];
  });

};
