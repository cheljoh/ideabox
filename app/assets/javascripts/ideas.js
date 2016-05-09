$(document).ready(function(){
  newIdea()
  getIdeas()
});

function getIdeas(){
  $.getJSON('api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      $(".ideas").append(
        cardViews(index, idea)
      )
    });
  })
}

function cardViews(index, idea) {
  return "<div class='row' id=idea-" + index + ">" +
      "<div class='col s12 m6'>" +
        "<div class='card green'>" +
          "<div class='card-content white-text'>" +
            "<span class='card-title'>" + idea.title + "</span>" +
            "<p>" + idea.body + "</p>" +
          "</div>" +
          "<div class='card-action'>" +
            "<p>" + idea.quality + "</p>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
}

function newIdea(){
  $(".ideas").prepend(
    "<form>" +
      "Title:<br>" +
      "<input type='text' name='title'><br>" +
      "Body:<br>" +
      "<input type='text' name='body'>" +
    "</form> <br>")
}
