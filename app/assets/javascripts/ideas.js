$(document).ready(function(){
  getIdeas()
});

function getIdeas(){
  $.getJSON('api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      $(".ideas").append(
        "<div class='row' id=idea-" + index + ">" +
          "<div class='col s12 m6'>" +
            "<div class='card blue-grey darken-1'>" +
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
      )
    });
  })
}
