const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addingChatRooms = require('../../src/hooks/adding-chat-rooms');

describe('\'addingChatRooms\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: addingChatRooms()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
