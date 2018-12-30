const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async get (id, params) {
    try {
      let user = await this.options.users.get(id);
      let userFriends = await this.options.contacts.find({
        query: {
          userId: user.id
        }
      });
      let friends = [];
      let userChatRoomsIds;
      let friendChatRoomsIds;

      for (const userFriend of userFriends.data) {
        let f = await this.options.users.get(userFriend.friendId);
        delete f.dataValues.password;
        userChatRoomsIds = this.options.userChatRooms.find({
          query: {
            userId: user.id
          }
        });
        friendChatRoomsIds = this.options.userChatRooms.find({
          query: {
            userId: f.id
          }
        });
        await Promise.all([userChatRoomsIds, friendChatRoomsIds])
          .then(async values => {
            userChatRoomsIds = values[0].data.map(v => v.dataValues.chatRoomId);
            friendChatRoomsIds = values[1].data.map(v => v.dataValues.chatRoomId);
            let intersections = userChatRoomsIds.filter(x => friendChatRoomsIds.indexOf(x) != -1);
            let wishedChatRoom = await this.options.chatRooms.find({
              query: {
                id: {
                  $in: intersections
                },
                isGroup: false
              }
            });

            if (wishedChatRoom.data.length > 1) {
              throw new Error('Intersection length cannot be greater than 1');
            } else if (wishedChatRoom.data.length == 1) {
              f.dataValues.room = wishedChatRoom.data[0].dataValues;
            }
          })
          .catch(error => {
            throw new Error(error.toString())
          });
          friends.push(f.dataValues);
      }
      delete user.dataValues.password;
      user.dataValues.contacts = friends;
      // obtains all groups user contains in
      let userChatRooms = await this.options.userChatRooms.find({
        query: {
          userId: user.id
        }
      });

      userChatRoomsIds = userChatRooms.data.map(r => r.dataValues.chatRoomId);
      
      let userGroups = await this.options.chatRooms.find({
        query: {
          id: {
            $in: userChatRoomsIds
          },
          isGroup: true
        }
      });
      let groupArr = [];
      for (let group of userGroups.data) {
        groupArr.push(group.dataValues);
      }
      user.dataValues.groups = groupArr;


      return user;
    } catch(e) {
      return new errors.BadRequest(e.toString());
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
