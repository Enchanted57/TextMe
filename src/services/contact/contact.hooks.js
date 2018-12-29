const { authenticate } = require('@feathersjs/authentication').hooks;

const addingChatRooms = require('../../hooks/adding-chat-rooms');
const validateFriendId = require('../../hooks/validate-friend-id');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [validateFriendId],
    update: [validateFriendId],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addingChatRooms],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
