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

    // find intersection
    userChatRooms = userChatRooms.data.map(x => x.dataValues.chatRoomId);
    friendChatRooms = friendChatRooms.data.map(x => x.dataValues.chatRoomId);

    let intersectionValuesList = userChatRooms.filter(x => friendChatRooms.indexOf(x) != -1);

    let chatRoom;
    // chat-room already exists
    if (intersectionValuesList.length) {
        chatRoom = await context.app.service('chat-rooms').find({
            query: {
               id: {
                   $in: intersectionValuesList
               },
               isGroup: false
            }
        });
    } else {
        chatRoom = await context.app.service('chat-rooms').create({
            name: `${user.name} and ${friend.name} conversation`,
            isGroup: false
        });

        context.app.service('user-chat-room').create({
            userId: context.data.userId,
            chatRoomId: chatRoom.dataValues.id
        });
        context.app.service('user-chat-room').create({
            userId: context.data.friendId,
            chatRoomId: chatRoom.dataValues.id
        });
    }
    
    return context;
  } catch (e) {
      
      return Promise.reject( 
          new errors.BadRequest(e.toString())
      );
  }
}
