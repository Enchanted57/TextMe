const { authenticate } = require('@feathersjs/authentication').hooks;

const addingChatRooms = require('../../hooks/adding-chat-rooms');
const validateFriendId = require('../../hooks/validate-friend-id'),
      validateFriendExistence = require('../../hooks/validate-friend-existence')
      addContactToContact = require('../../hooks/add-contact-to-contact');

const notImplemented = require('./notImplemented');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [validateFriendId],
    update: [validateFriendId],
    patch: [],
    remove: [notImplemented(), validateFriendId, validateFriendExistence]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addingChatRooms, addContactToContact],
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
