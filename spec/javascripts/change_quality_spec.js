//= require events

describe('getNewQuality', function () {
  it('promotes a quality', function () {
    var partToReplace = 'upvote';
    var quality = 'swill';
    assert.equal(getNewQuality(partToReplace, quality), "plausible");
  });

  it('demotes a quality', function () {
    var partToReplace = 'downvote';
    var quality = 'plausible';
    assert.equal(getNewQuality(partToReplace, quality), "swill");
  });

  it('cannot upvote genius', function () {
    var partToReplace = 'upvote';
    var quality = 'genius';
    assert.equal(getNewQuality(partToReplace, quality), "genius");
  });

  it('cannot downvote swill', function () {
    var partToReplace = 'downvote';
    var quality = 'swill';
    assert.equal(getNewQuality(partToReplace, quality), "swill");
  });
});
