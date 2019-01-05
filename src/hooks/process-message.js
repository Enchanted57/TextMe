const errors = require('@feathersjs/errors');

module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    if (!data.text)
      throw new errors.BadRequest('Message must have a text');

    const text = data.text.substring(0, 255);
    const chatRoomId = data.chatRoomId;
    const user = context.params.user.dataValues;
    
    if ( !(await validateChatRoomId(context)) )  {
      throw new errors.BadRequest(`You can't post messages in this chat-room: ${chatRoomId}`);
    }
    
    context.data = {
      text,
      userId: user.id,
      createdAt: new Date().toISOString(),
      chatRoomId
    };

    return context;
  };
};

async function validateChatRoomId(context) {
  const chatRoomId = context.data.chatRoomId,
        userId     = context.params.user.dataValues.id;
  
  const result = await context.app.service('user-chat-room').find({
    query: {
      chatRoomId,
      userId
    }
  });
  
  return result.data.length == 0 ? false : true;
}
