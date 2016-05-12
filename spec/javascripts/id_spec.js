//= require ideas

describe('getId', function () {
  it('cleans ids', function () {
    var dirtyId = 'upvote-73';
    var cleanedId = '73';
    assert.equal(getId(dirtyId), cleanedId);
  });
});
