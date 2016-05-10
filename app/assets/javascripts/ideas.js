$(document).ready(function(){
  newIdea()
  getIdeas()
  // $("body").on("click", "save-idea", saveIdea);
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
  $(".ideas").prepend(
    "<form>" +
      "Title:<br>" +
      "<input type='text' id='title' name='title'><br>" + //#title.val
      "Body:<br>" +
      "<input type='text' id='body' name='body'>" +
      "<button class='save-idea btn cyan accent-4'>Save</button>" +
      // "<input id='save-idea' type='submit' value='Save' class='save btn cyan accent-4'>" +
    "</form> <br>")
}

function saveIdea(){
  title = $("#title").val()
  body = $("#body").val()
  var idea = {"idea": {"title": title, "body": body}}
  $.ajax({
    url: "/api/v1/ideas",
    method: "POST",
    dataType: "json",
    data: idea,
    success: function(response){
      
    },
    error: function(){
      console.log("whoops")
    }
  });
}
