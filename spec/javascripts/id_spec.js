//= require ideas

describe('removeSpace', function () {
  it('removes spaces from a string', function () {
    var dirtyId = 'upvote-73';
    var cleanedId = '73';
    assert.equal(getId(dirtyId), cleanedId);
  });
});
