function updateQuality(content, id){
  $("#quality-" + id).text(content);
}

function getId(id){
  var getNumbers = /\d+/;
  var cleanedId = (id.match(getNumbers))[0];
  return cleanedId;
}

function removeIdea(ideaId){
  $("#idea-" + ideaId).remove();
}

function addNewIdea(idea){
  $(".ideas").prepend(
    cardViews(idea)
  )
}

function showFlash(){
  $(".flash").show();
}

function hideFlash(){
  $(".flash").hide();
}

function removeTextField(){
  $("#title").val("");
  $("#body").val("");
}
