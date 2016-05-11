var ideaCounter = 0

$(document).ready(function(){
  newIdea()
  getIdeas()
  $("body").on("click", "button.save-idea", saveIdea);
  $("body").on("click", "button.delete-idea", deleteIdea);
  $("body").on("click", "button.upvote-idea", upvoteIdea);
  $("body").on("click", "button.downvote-idea", downvoteIdea);
  $("body").on("click", "button.edit-idea", editIdea);
  $("body").on("click", "button.submit-edit", submitEdit);
});

function getIdeas(){
  $.getJSON('api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      $(".ideas").append(
        cardViews(idea)
      )
    });
  })
}

function cardViews(idea) {
  return "<div class='row' id=idea-" + idea.id + ">" +
      "<div class='col s12 m7'>" +
        "<div class='card green'>" +
          "<div class='card-content white-text'>" +
            "<span id=title-" + idea.id + " class='card-title'>" + idea.title + "</span>" +
            "<p id=body-" + idea.id + ">" + idea.body + "</p>" +
          "</div>" +
          "<div class='card-action'>" +
            "<p id=quality-" + idea.id + ">" + idea.quality + "</p>" +
            "<button id=upvote-" + idea.id + " class='upvote-idea btn cyan accent-4'>Upvote!</button>" +
            "<button id=downvote-" + idea.id + " class='downvote-idea btn amber'>Downvote!</button>" +
            "<button id=" + idea.id + " class='delete-idea btn red'>Delete</button>" +
            "<button id=edit-" + idea.id + " class='edit-idea btn purple'>Edit</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
}

function newIdea(){
  $(".new-idea").html(
    "<h5> Enter a New Idea</h5>" +
    "<form>" +
      "Title:<br>" +
      "<input type='text' id='title' name='title-box'><br>" +
      "Body:<br>" +
      "<input type='text' id='body' name='body-box'>" +
      "<button class='save-idea btn cyan accent-4'>Save</button>" +
    "</form> <br>")
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

function downvoteIdea(upOrDown){
  var id = getId($(this)[0].id)
  var quality = $("#quality-" + id).text()
  var downvote = {genius: "plausible", plausible: "swill", swill: "swill"}
  var quality = downvote[quality]
  updatedData = {idea: {quality: quality}}
  $.ajax({
    url: "/api/v1/ideas/"+ id,
    method: "PUT",
    dataType: "json",
    data: updatedData,
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

function upvoteIdea(){
  var id = getId($(this)[0].id)
  var quality = $("#quality-" + id).text()
  var upvote = {swill: "plausible", plausible: "genius", genius: "genius"}
  var upvotedQuality = upvote[quality]
  updatedData = {idea: {quality: upvotedQuality}}
  $.ajax({
    url: "/api/v1/ideas/"+ id,
    method: "PUT",
    dataType: "json",
    data: updatedData,
    success: function(response){
      updateQuality(upvotedQuality, id)
    },
    error: function(){
      console.log("Something went wrong")
    }
  });
}

// function updateIdea(id, updatedData, quality){
//   $.ajax({
//     url: "/api/v1/ideas/"+ id,
//     method: "PUT",
//     dataType: "json",
//     data: updatedData,
//     success: function(response){
//       updateField(quality, id)
//     },
//     error: function(){
//       console.log("Something went wrong")
//     }
//   });
// }

function updateQuality(content, id){
  $("#quality-" + id).text(content)
}

function editIdea(){
  var id = getId($(this)[0].id)
  var currentTitle = $("#title-" + id).text()
  var currentBody = $("#body-" + id).text()
  $(".new-idea").hide()
  $("#edit-idea").append(
    "<h5> Edit the Idea </h5>" +
    "<form>" +
      "Title:<br>" +
      "<input type='text' id='edit-title' value=" + currentTitle + " name='edit-title'><br>" +
      "Body:<br>" +
      "<input type='text' id='edit-body' value=" + currentBody + " name='edit-body'>" +
      "<button id=enter-" + id + " class='submit-edit btn cyan accent-4'>Enter</button>" +
    "</form> <br>")
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

function submitEdit(event){
  event.preventDefault()
  var id = getId($(this)[0].id)
  updatedTitle = $("#edit-title").val()
  updatedBody = $("#edit-body").val()
  var idea = {idea: {title: updatedTitle, body: updatedBody}}
  $.ajax({
    url: "/api/v1/ideas/"+ id,
    method: "PUT",
    dataType: "json",
    data: idea,
    success: function(response){
      updateIdea(id, updatedTitle, updatedBody)
    },
    error: function(){
      showFlash()
    }
  });
}

function updateIdea(id, title, body){
  $("#title-" + id).text(title)
  $("#body-" + id).text(body)
  $(".new-idea").show()
  $("#edit-idea").hide()
}
