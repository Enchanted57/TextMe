const errors = require('@feathersjs/errors');

module.exports = async function(context) {
  try { 
    const user = await context.app.service('user').get(context.data.userId);
    const friend = await context.app.service('user').get(context.data.friendId);

    let userChatRooms = await context.app.service('user-chat-room').find({
        query: {
            userId: context.data.userId
        }
    });

    let friendChatRooms = await context.app.service('user-chat-room').find({
        query: {
            userId: context.data.friendId
        }
    });

    userChatRooms = userChatRooms.data.map(x => x.dataValues.chatRoomId);
    friendChatRooms = friendChatRooms.data.map(x => x.dataValues.chatRoomId);
    // find intersections
    let intersectionValuesList = userChatRooms.filter(x => friendChatRooms.indexOf(x) != -1);

    let chatRoom;
    // chat-room already exists and it is not group
    chatRoom = await context.app.service('chat-rooms').find({
        query: {
           id: {
               $in: intersectionValuesList
           },
           isGroup: false
        }
    });

    if (!chatRoom.data.length) {
        chatRoom = await context.app.service('chat-rooms').create({
            name: `${user.name} and ${friend.name} conversation`,
            isGroup: false
        });

        let query1 = context.app.service('user-chat-room').create({
            userId: context.data.userId,
            chatRoomId: chatRoom.dataValues.id
        });
        let query2 = context.app.service('user-chat-room').create({
            userId: context.data.friendId,
            chatRoomId: chatRoom.dataValues.id
        });

        await Promise.all([query1, query2])
            .then(values => {} )
            .catch(error => error.message);
    }
    
    return context;
  } catch (e) {
      
      return Promise.reject( 
          new errors.BadRequest(e.toString())
      );
  }
}
