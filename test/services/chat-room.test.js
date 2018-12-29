const assert = require('assert');
const app = require('../../src/app');

describe('\'chat-room\' service', () => {
  it('registered the service', () => {
    const service = app.service('chat-rooms');

    assert.ok(service, 'Registered the service');
  });
});
