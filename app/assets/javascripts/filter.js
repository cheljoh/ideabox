function searchField(){
  $("#filter").change(function(){
    var filter = $(this).val();
    $(".idea-cards").each(function(index, idea){
      debugger
      var title = $(idea).find(".card-content").find(".card-title").text();
      var body = $(idea).find(".card-content").find(".card-body").text();
      title.match(filter) || body.match(filter) ? $(idea).show() : $(idea).hide();
    })
  })
  .keyup(function(){
    $(this).change();
  });
}
