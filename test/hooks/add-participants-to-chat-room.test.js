const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addParticipantsToChatRoom = require('../../src/hooks/add-participants-to-chat-room');

describe('\'addParticipantsToChatRoom\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
