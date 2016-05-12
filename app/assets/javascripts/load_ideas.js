function getIdeas(){
  $.getJSON('api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      $(".ideas").append(
        cardViews(idea)
      );
    });
  });
}

function cardViews(idea) {
  return "<div class='row idea-cards' data-filter='true' data-input='.filter-input' id=idea-" + idea.id + ">" +
      "<div class='col s12 m6'>" +
        "<div class='card green'>" +
          "<div class='card-content white-text'>" +
            "<span contentEditable='true' id=title-" + idea.id + " class='card-title'>" + idea.title + "</span> <br>" +
            "<p class='card-body' contentEditable='true' id=body-" + idea.id + ">" + idea.body + "</p>" +
          "</div>" +
          "<div class='card-action'>" +
            "<p class='cyan-text text-lighten-4' id=quality-" + idea.id + ">" + idea.quality + "</p>" +
            "<button id=upvote-" + idea.id + " class='upvote-idea btn cyan accent-4'>Upvote!</button>" +
            "<button id=downvote-" + idea.id + " class='downvote-idea btn amber'>Downvote!</button>" +
            "<button id=" + idea.id + " class='delete-idea btn purple lighten-2'>Delete</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
}
