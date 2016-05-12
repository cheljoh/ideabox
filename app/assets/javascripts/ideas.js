$(document).ready(function(){
  getIdeas()
  searchField()
  $("body").on("click", "button.save-idea", saveIdea);
  $("body").on("click", "button.delete-idea", deleteIdea);
  $("body").on("click", "button.upvote-idea", downvoteOrUpvote);
  $("body").on("click", "button.downvote-idea", downvoteOrUpvote);
  // $("body").on("click", "button.upvote-idea", upvoteIdea);
  // $("body").on("click", "button.downvote-idea", downvoteIdea);
  $("body").on("blur", ".card-title", editIdea);
  $("body").on("blur", ".card-body", editIdea);
});

function editIdea(){
  var id = getId($(this).attr("id"))
  var partToReplace = $(this).attr("class")
  var contents = $(this).text()
  if (partToReplace == "card-title") {
    var ideaAttribute = {title: contents}
  } else if (partToReplace == "card-body"){
    var ideaAttribute = {body: contents}
  }
  if (contents == ""){
    showFlash()
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  else {
    var idea = {idea: ideaAttribute }
    hideFlash()
    updateIdea(idea, id)
  }
}

function searchField(){
  $("#filter").change(function(){
    var filter = $(this).val();
    $(".idea-cards").each(function(index, idea){
      var title = $(idea).find(".card-content").find(".card-title").text();
      var body = $(idea).find(".card-content").find(".card-body").text();
      title.match(filter) || body.match(filter) ? $(idea).show() : $(idea).hide();
    })
  })
  .keyup(function(){
    $(this).change();
  });
}

function getIdeas(){
  $.getJSON('api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      $(".ideas").append(
        cardViews(idea)
      )
    });
  })
}

function saveIdea(event){
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
  $(".ideas").prepend(
    cardViews(idea)
  )
}

function deleteIdea(){
  ideaId = $(this)[0].id
  $.ajax({
    url: "/api/v1/ideas/"+ ideaId,
    method: "DELETE",
    dataType: "json",
    success: function(response){
      removeIdea(ideaId)
    },
    error: function(){
      console.log("Something went wrong")
    }
  });
}

function removeIdea(ideaId){
  $("#idea-" + ideaId).remove()
}

function updateIdea(idea, id, quality){
  $.ajax({
    url: "/api/v1/ideas/"+ id,
    method: "PUT",
    dataType: "json",
    data: idea,
    success: function(response){
      updateQuality(quality, id)
    },
    error: function(){
      console.log("Something went wrong")
    }
  });
}

function getId(id){
  var getNumbers = /\d+/
  var cleanedId = (id.match(getNumbers))[0]
  return cleanedId
}

function getNewQuality(partToReplace, quality){
  if (partToReplace == "upvote") {
    var upvote = {swill: "plausible", plausible: "genius", genius: "genius"}
    var updatedQuality = upvote[quality]
  } else if (partToReplace == "downvote"){
    var downvote = {genius: "plausible", plausible: "swill", swill: "swill"}
    var updatedQuality = downvote[quality]
  }
  return updatedQuality
}

function downvoteOrUpvote(){
  var id = getId($(this).attr("id"))
  var quality = $("#quality-" + id).text()
  var partToReplace = $(this).attr("class").split("-")[0]
  var updatedQuality = getNewQuality(partToReplace, quality)
  updatedData = {idea: {quality: updatedQuality}}
  updateIdea(updatedData, id, updatedQuality)
}

function updateQuality(content, id){
  $("#quality-" + id).text(content)
}

function cardViews(idea) {
  return "<div class='row idea-cards' data-filter='true' data-input='.filter-input' id=idea-" + idea.id + ">" +
      "<div class='col s12 m6'>" +
        "<div class='card green'>" +
          "<div class='card-content white-text'>" +
            "<input><span contentEditable='true' id=title-" + idea.id + " class='card-title'>" + idea.title + "</span></input>" +
            "<p class='card-body' contentEditable='true' id=body-" + idea.id + ">" + idea.body + "</p>" +
          "</div>" +
          "<div class='card-action'>" +
            "<p id=quality-" + idea.id + ">" + idea.quality + "</p>" +
            "<button id=upvote-" + idea.id + " class='upvote-idea btn cyan accent-4'>Upvote!</button>" +
            "<button id=downvote-" + idea.id + " class='downvote-idea btn amber'>Downvote!</button>" +
            "<button id=" + idea.id + " class='delete-idea btn red'>Delete</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
}
