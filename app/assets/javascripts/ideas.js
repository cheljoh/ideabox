var ideaCounter = 0

$(document).ready(function(){
  newIdea()
  getIdeas()
  $("body").on("click", "button.save-idea", saveIdea);
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
  $(".new-idea").html(
    "<form>" +
      "Title:<br>" +
      "<input type='text' id='title' name='title-box'><br>" +
      "Body:<br>" +
      "<input type='text' id='body' name='body-box'>" +
      "<button class='save-idea btn cyan accent-4'>Save</button>" +
    "</form> <br>")
}

function saveIdea(){
  event.preventDefault()
  var idea = {"idea": {"title": $("#title").val(), "body": $("#body").val()}}
  $.ajax({
    url: "/api/v1/ideas",
    method: "POST",
    dataType: "json",
    data: idea,
    success: function(response){
      hideFlash()
      addNewIdea(response.idea)
      incrementNewIdeaCounter()
      removeTextField()
    },
    error: function(){
      showFlash()
    }
  });
}

function showFlash(){
  $(".flash").show()
}

function hideFlash(){
  $(".flash").hide()
}

function removeTextField(){
  $("#title").val("")
  $("#body").val("")
}

function addNewIdea(idea){
  var index = "new-" + ideaCounter
  $(".ideas").prepend(
    cardViews(index, idea)
  )
}

function incrementNewIdeaCounter(){
  ideaCounter += 1
}
