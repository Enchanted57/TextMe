const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const validateFriendExistence = require('../../src/hooks/validate-friend-existence');

describe('\'validateFriendExistence\' hook', () => {
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
