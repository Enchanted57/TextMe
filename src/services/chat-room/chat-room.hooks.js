const { authenticate } = require('@feathersjs/authentication').hooks;
const addRelationshipToMessage = require('./addRelationshipToMessage');
const addParticipants = require('../../hooks/add-participants-to-chat-room');

module.exports = {
  before: {
  all: [ authenticate('jwt') ],
    find: [],
    get: [addRelationshipToMessage()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [addParticipants],
    create: [],
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
