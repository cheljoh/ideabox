$(document).ready(function(){
  getIdeas();
  searchField();
  $("body").on("click", "button.save-idea", saveIdea);
  $("body").on("click", "button.delete-idea", deleteIdea);
  $("body").on("click", "button.upvote-idea", downvoteOrUpvote);
  $("body").on("click", "button.downvote-idea", downvoteOrUpvote);
  $("body").on("blur", ".card-title", editIdea);
  $("body").on("blur", ".card-body", editIdea);
});

function saveIdea(event){
  event.preventDefault();
  var idea = { "idea": { "title": $("#title").val(), "body": $("#body").val() } };
  $.ajax({
    url: "/api/v1/ideas",
    method: "POST",
    dataType: "json",
    data: idea,
    success: function(response){
      hideFlash();
      addNewIdea(response.idea);
      removeTextField();
    },
    error: function(){
      showFlash();
    }
  });
}

function deleteIdea(){
  ideaId = $(this).attr("id");
  $.ajax({
    url: "/api/v1/ideas/"+ ideaId,
    method: "DELETE",
    dataType: "json",
    success: function(response){
      removeIdea(ideaId);
    },
    error: function(){
      console.log("Something went wrong");
    }
  });
}

function updateIdea(idea, id, quality){
  $.ajax({
    url: "/api/v1/ideas/"+ id,
    method: "PUT",
    dataType: "json",
    data: idea,
    success: function(){
      if (typeof quality !== "undefined"){ updateQuality(quality, id); }
    },
    error: function(){
      console.log("Something went wrong");
    }
  });
}

function editIdea(){
  var id = getId($(this).attr("id"));
  var partToReplace = $(this).attr("class");
  var contents = $(this).text();
  var ideaAttribute = setAttribute(partToReplace, contents);
  checkForContents(contents, ideaAttribute, id);
}

function setAttribute(partToReplace, contents){
  if (partToReplace == "card-title") {
    var ideaAttribute = {title: contents};
  } else if (partToReplace == "card-body"){
    var ideaAttribute = {body: contents};
  }
  return ideaAttribute;
}

function checkForContents(contents, ideaAttribute, id){
  if (contents == ""){
    showFlash();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  else {
    var idea = { idea: ideaAttribute };
    hideFlash();
    updateIdea(idea, id);
  }
}

function downvoteOrUpvote(){
  var id = getId($(this).attr("id"));
  var quality = $("#quality-" + id).text();
  var partToReplace = $(this).attr("class").split("-")[0];
  var updatedQuality = getNewQuality(partToReplace, quality);
  updatedData = { idea: { quality: updatedQuality } };
  updateIdea(updatedData, id, updatedQuality);
}

function getNewQuality(partToReplace, quality){
  if (partToReplace == "upvote") {
    var upvote = { swill: "plausible", plausible: "genius", genius: "genius" };
    var updatedQuality = upvote[quality];
  } else if (partToReplace == "downvote"){
    var downvote = { genius: "plausible", plausible: "swill", swill: "swill" };
    var updatedQuality = downvote[quality];
  }
  return updatedQuality;
}
